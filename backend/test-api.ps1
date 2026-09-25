$base = "http://localhost:8000/api/v1"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "       JOB PORTAL API TEST" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# =========================================================
# CREATE SESSIONS
# =========================================================

$recruiterSession = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$studentSession = New-Object Microsoft.PowerShell.Commands.WebRequestSession

$time = Get-Date -Format "yyyyMMddHHmmss"

$recruiterEmail = "recruiter$time@gmail.com"
$studentEmail = "student$time@gmail.com"
$password = "123456"

# =========================================================
# 1. REGISTER RECRUITER
# =========================================================

Write-Host "`n[1] Register Recruiter" -ForegroundColor Yellow

$body = @{
    fullName = "Test Recruiter"
    email = $recruiterEmail
    phoneNumber = "9876543210"
    password = $password
    role = "recruiter"
} | ConvertTo-Json

try {
    Invoke-RestMethod `
        -Uri "$base/user/register" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body | Out-Null

    Write-Host "PASS" -ForegroundColor Green
}
catch {
    Write-Host "Register failed, continuing..." -ForegroundColor Yellow
}

# =========================================================
# 2. LOGIN RECRUITER
# =========================================================

Write-Host "`n[2] Login Recruiter" -ForegroundColor Yellow

$body = @{
    email = $recruiterEmail
    password = $password
    role = "recruiter"
} | ConvertTo-Json

try {
    Invoke-RestMethod `
        -Uri "$base/user/login" `
        -Method POST `
        -ContentType "application/json" `
        -WebSession $recruiterSession `
        -Body $body | Out-Null

    Write-Host "PASS" -ForegroundColor Green
}
catch {
    Write-Host "FAIL" -ForegroundColor Red
    Write-Host $_.Exception.Message
    exit
}

# =========================================================
# 3. REGISTER COMPANY
# =========================================================

Write-Host "`n[3] Register Company" -ForegroundColor Yellow

$body = @{
    companyName = "Test Company $time"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod `
        -Uri "$base/company/register" `
        -Method POST `
        -ContentType "application/json" `
        -WebSession $recruiterSession `
        -Body $body

    $companyId = $response.company._id

    Write-Host "PASS" -ForegroundColor Green
    Write-Host "Company ID: $companyId" -ForegroundColor Gray
}
catch {
    Write-Host "FAIL" -ForegroundColor Red
    Write-Host $_.Exception.Message
    exit
}

# =========================================================
# 4. GET COMPANIES
# =========================================================

Write-Host "`n[4] Get Companies" -ForegroundColor Yellow

try {
    Invoke-RestMethod `
        -Uri "$base/company/get" `
        -Method GET `
        -WebSession $recruiterSession | Out-Null

    Write-Host "PASS" -ForegroundColor Green
}
catch {
    Write-Host "FAIL" -ForegroundColor Red
}

# =========================================================
# 5. GET COMPANY BY ID
# =========================================================

Write-Host "`n[5] Get Company By ID" -ForegroundColor Yellow

try {
    Invoke-RestMethod `
        -Uri "$base/company/get/$companyId" `
        -Method GET `
        -WebSession $recruiterSession | Out-Null

    Write-Host "PASS" -ForegroundColor Green
}
catch {
    Write-Host "FAIL" -ForegroundColor Red
}

# =========================================================
# 6. UPDATE COMPANY
# =========================================================

Write-Host "`n[6] Update Company" -ForegroundColor Yellow

$body = @{
    name = "Updated Test Company $time"
    description = "API testing company"
    website = "https://example.com"
    location = "Pune"
} | ConvertTo-Json

try {
    Invoke-RestMethod `
        -Uri "$base/company/update/$companyId" `
        -Method PUT `
        -ContentType "application/json" `
        -WebSession $recruiterSession `
        -Body $body | Out-Null

    Write-Host "PASS" -ForegroundColor Green
}
catch {
    Write-Host "FAIL" -ForegroundColor Red
}

# =========================================================
# 7. POST JOB
# =========================================================

Write-Host "`n[7] Post Job" -ForegroundColor Yellow

$body = @{
    title = "MERN Stack Developer"
    description = "Looking for a MERN Stack Developer"
    requirements = "React,Node.js,Express,MongoDB"
    salary = "60000"
    location = "Pune"
    jobType = "Full-time"
    experience = "2"
    position = "3"
    companyId = $companyId
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod `
        -Uri "$base/job/post" `
        -Method POST `
        -ContentType "application/json" `
        -WebSession $recruiterSession `
        -Body $body

    $jobId = $response.job._id

    Write-Host "PASS" -ForegroundColor Green
    Write-Host "Job ID: $jobId" -ForegroundColor Gray
}
catch {
    Write-Host "FAIL" -ForegroundColor Red
    Write-Host $_.Exception.Message
    exit
}

# =========================================================
# 8. GET ALL JOBS
# =========================================================

Write-Host "`n[8] Get All Jobs" -ForegroundColor Yellow

try {
    Invoke-RestMethod `
        -Uri "$base/job/get" `
        -Method GET `
        -WebSession $recruiterSession | Out-Null

    Write-Host "PASS" -ForegroundColor Green
}
catch {
    Write-Host "FAIL" -ForegroundColor Red
}

# =========================================================
# 9. SEARCH JOBS
# =========================================================

Write-Host "`n[9] Search Jobs" -ForegroundColor Yellow

try {
    Invoke-RestMethod `
        -Uri "$base/job/get?keyword=MERN" `
        -Method GET `
        -WebSession $recruiterSession | Out-Null

    Write-Host "PASS" -ForegroundColor Green
}
catch {
    Write-Host "FAIL" -ForegroundColor Red
}

# =========================================================
# 10. GET JOB BY ID
# =========================================================

Write-Host "`n[10] Get Job By ID" -ForegroundColor Yellow

try {
    Invoke-RestMethod `
        -Uri "$base/job/get/$jobId" `
        -Method GET `
        -WebSession $recruiterSession | Out-Null

    Write-Host "PASS" -ForegroundColor Green
}
catch {
    Write-Host "FAIL" -ForegroundColor Red
}

# =========================================================
# 11. GET ADMIN JOBS
# =========================================================

Write-Host "`n[11] Get Admin Jobs" -ForegroundColor Yellow

try {
    Invoke-RestMethod `
        -Uri "$base/job/getadminjobs" `
        -Method GET `
        -WebSession $recruiterSession | Out-Null

    Write-Host "PASS" -ForegroundColor Green
}
catch {
    Write-Host "FAIL" -ForegroundColor Red
}

# =========================================================
# 12. REGISTER STUDENT
# =========================================================

Write-Host "`n[12] Register Student" -ForegroundColor Yellow

$body = @{
    fullName = "Test Student"
    email = $studentEmail
    phoneNumber = "9123456789"
    password = $password
    role = "student"
} | ConvertTo-Json

try {
    Invoke-RestMethod `
        -Uri "$base/user/register" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body | Out-Null

    Write-Host "PASS" -ForegroundColor Green
}
catch {
    Write-Host "Register failed, continuing..." -ForegroundColor Yellow
}

# =========================================================
# 13. LOGIN STUDENT
# =========================================================

Write-Host "`n[13] Login Student" -ForegroundColor Yellow

$body = @{
    email = $studentEmail
    password = $password
    role = "student"
} | ConvertTo-Json

try {
    Invoke-RestMethod `
        -Uri "$base/user/login" `
        -Method POST `
        -ContentType "application/json" `
        -WebSession $studentSession `
        -Body $body | Out-Null

    Write-Host "PASS" -ForegroundColor Green
}
catch {
    Write-Host "FAIL" -ForegroundColor Red
    Write-Host $_.Exception.Message
    exit
}

# =========================================================
# 14. STUDENT GET JOBS
# =========================================================

Write-Host "`n[14] Student Get Jobs" -ForegroundColor Yellow

try {
    Invoke-RestMethod `
        -Uri "$base/job/get" `
        -Method GET `
        -WebSession $studentSession | Out-Null

    Write-Host "PASS" -ForegroundColor Green
}
catch {
    Write-Host "FAIL" -ForegroundColor Red
}

# =========================================================
# 15. STUDENT GET JOB BY ID
# =========================================================

Write-Host "`n[15] Student Get Job By ID" -ForegroundColor Yellow

try {
    Invoke-RestMethod `
        -Uri "$base/job/get/$jobId" `
        -Method GET `
        -WebSession $studentSession | Out-Null

    Write-Host "PASS" -ForegroundColor Green
}
catch {
    Write-Host "FAIL" -ForegroundColor Red
}

# =========================================================
# 16. APPLY FOR JOB
# =========================================================

Write-Host "`n[16] Apply For Job" -ForegroundColor Yellow

try {
    Invoke-RestMethod `
        -Uri "$base/application/apply/$jobId" `
        -Method POST `
        -WebSession $studentSession | Out-Null

    Write-Host "PASS" -ForegroundColor Green
}
catch {
    Write-Host "FAIL" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

# =========================================================
# 17. GET APPLIED JOBS
# =========================================================

Write-Host "`n[17] Get Applied Jobs" -ForegroundColor Yellow

try {
    Invoke-RestMethod `
        -Uri "$base/application/get" `
        -Method GET `
        -WebSession $studentSession | Out-Null

    Write-Host "PASS" -ForegroundColor Green
}
catch {
    Write-Host "FAIL" -ForegroundColor Red
}

# =========================================================
# 18. GET APPLICANTS
# =========================================================

Write-Host "`n[18] Get Applicants" -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod `
        -Uri "$base/application/$jobId/applicants" `
        -Method GET `
        -WebSession $recruiterSession

    Write-Host "PASS" -ForegroundColor Green

    if ($response.job.applications -and $response.job.applications.Count -gt 0) {
    $applicationId = $response.job.applications[0]._id
}
}
catch {
    Write-Host "FAIL" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

# =========================================================
# 19. UPDATE APPLICATION STATUS
# =========================================================

if ($applicationId) {

    Write-Host "`n[19] Update Application Status" -ForegroundColor Yellow

    $body = @{
        status = "accepted"
    } | ConvertTo-Json

    try {
        Invoke-RestMethod `
            -Uri "$base/application/status/$applicationId/update" `
            -Method POST `
            -ContentType "application/json" `
            -WebSession $recruiterSession `
            -Body $body | Out-Null

        Write-Host "PASS" -ForegroundColor Green
    }
    catch {
        Write-Host "FAIL" -ForegroundColor Red
        Write-Host $_.Exception.Message
    }
}
else {
    Write-Host "`n[19] Update Application Status - SKIPPED" -ForegroundColor Yellow
    Write-Host "Application ID was not found." -ForegroundColor DarkYellow
}

# =========================================================
# 20. AUTHENTICATION TEST
# =========================================================

Write-Host "`n[20] Test Authentication" -ForegroundColor Yellow

$noAuthSession = New-Object Microsoft.PowerShell.Commands.WebRequestSession

try {
    Invoke-RestMethod `
        -Uri "$base/company/get" `
        -Method GET `
        -WebSession $noAuthSession | Out-Null

    Write-Host "FAIL - Unauthenticated request was allowed" -ForegroundColor Red
}
catch {
    Write-Host "PASS - Authentication protection works" -ForegroundColor Green
}

# =========================================================
# FINAL RESULT
# =========================================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "          TESTING COMPLETED" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "Recruiter : $recruiterEmail" -ForegroundColor Gray
Write-Host "Student   : $studentEmail" -ForegroundColor Gray
Write-Host "Company ID: $companyId" -ForegroundColor Gray
Write-Host "Job ID    : $jobId" -ForegroundColor Gray
Write-Host ""