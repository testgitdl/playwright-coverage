export default {
    import: ['e2e/support/*.ts', 'e2e/features/step_definitions/*.ts'],
    paths: ['e2e/features/*.feature'],
    requireModule: ['ts-node/register', 'tsconfig-paths/register', 'source-map-support/register'],
    format: [
        'json:testResults/report_bdd.json',
        'html:testResults/cucumber-html-report-bdd.html',
        'summary',
        'progress - bar',
        '@cucumber/pretty-formatter'
    ],
    publishQuiet: true
}
