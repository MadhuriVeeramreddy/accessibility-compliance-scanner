# Data Flow: How UI Retrieves and Displays Values

## Overview
The UI dashboard and PDF report use different data sources, which causes the discrepancy in issue counts.

## Data Flow Diagram

```
Backend Scan Processing
├── axe.service.ts: runAxeScan()
│   ├── Returns: { violations: [...], issues: [...] }
│   ├── violations: Array of rule violations (one per rule, even if multiple nodes)
│   └── issues: Expanded array (one issue per node)
│
├── backgroundProcessor.ts: Process scan
│   ├── Stores in database: metaJson.axe = axeResults.violations (line 151)
│   └── Uses for PDF: axeResults.issues (line 159)
│
└── Database (Prisma)
    └── Scan.metaJson = {
        axe: violations[],  // Array of violations (one per rule)
        gigw: gigwResults
    }

Frontend Retrieval
├── lib/api.ts: getScan(scanId)
│   └── Calls: GET /api/v1/scan/${scanId}
│
├── backend/src/controllers/scan.controller.ts: getScanById()
│   └── Returns: Scan object with metaJson.axe = violations[]
│
├── app/scan/[id]/page.tsx (line 67)
│   └── Extracts: const issues = scan.metaJson?.axe || []
│   └── Passes to: <AccessibilityReport issues={issues} />
│
└── components/AccessibilityReport.tsx (lines 117-122)
    └── Counts: issues.filter(i => i.impact === 'critical').length
    └── Result: Counts violations (one per rule)
```

## Key Differences

### UI Dashboard (AccessibilityReport.tsx)
- **Data Source**: `scan.metaJson.axe` = `violations[]` (from axe-core)
- **Structure**: Each violation is one object, even if it has multiple nodes
- **Counting Method**: `issues.filter(i => i.impact === 'critical').length`
- **Result**: Counts **violations** (one per rule)
- **Example**: 1 violation with 8 nodes = **1 issue**

### PDF Report (generatePDF.ts)
- **Data Source**: `axeResults.issues` (expanded array)
- **Structure**: Each node becomes a separate issue
- **Counting Method**: `calculateSeverityBreakdown(enrichedIssues)`
- **Result**: Counts **nodes** (one per occurrence)
- **Example**: 1 violation with 8 nodes = **8 issues**

## Code References

### Backend Storage
```typescript
// backend/src/queues/backgroundProcessor.ts:151
metaJson: {
  axe: axeResults.violations,  // ← Stored for UI
  gigw: gigwResults,
}

// backend/src/queues/backgroundProcessor.ts:159
const issues = axeResults.issues;  // ← Used for PDF (expanded)
```

### Frontend Retrieval
```typescript
// app/scan/[id]/page.tsx:67
const issues = scan.metaJson?.axe || [];  // ← Gets violations

// components/AccessibilityReport.tsx:117-122
const severityCounts = {
  critical: issues.filter(i => i.impact === 'critical').length,
  serious: issues.filter(i => i.impact === 'serious').length,
  moderate: issues.filter(i => i.impact === 'moderate').length,
  minor: issues.filter(i => i.impact === 'minor').length,
};
```

### Axe Service Structure
```typescript
// backend/src/services/axe.service.ts:26-38
const issues: IssueData[] = [];
for (const violation of results.violations) {
  for (const node of violation.nodes) {  // ← Expands each violation
    issues.push({...});  // One issue per node
  }
}
return {
  violations: results.violations,  // ← Original violations (for UI)
  issues,  // ← Expanded issues (for PDF)
};
```

## Solution Options

### Option 1: Make PDF count violations (like UI)
- Change PDF to use `violations` instead of `issues`
- Count grouped issues by ruleId, not individual nodes
- **Pros**: Matches UI, more meaningful (shows unique problems)
- **Cons**: Need to update PDF generation logic

### Option 2: Make UI count nodes (like PDF)
- Change UI to use expanded issues
- Count all node occurrences
- **Pros**: Shows total occurrences
- **Cons**: Less meaningful, doesn't match current UI design

### Option 3: Show both counts
- Display violations count (unique rules)
- Display nodes count (total occurrences)
- **Pros**: Most informative
- **Cons**: More complex UI

## Recommended Solution
**Option 1** is recommended because:
1. Violations (unique rules) are more meaningful than node counts
2. Matches current UI design
3. Users care about "what problems exist" not "how many times"
4. Easier to prioritize fixes (fix the rule, not each occurrence)

