param (
    [string]$filePath,
    [string]$rceditPath = "B:\ENV\rcedit\rcedit.exe",
    [switch]$Verbose
)

function Write-Color {
    param (
        [string]$Text,
        [string]$Color,
        [switch]$NoNewline
    )

    switch ($Color) {
        "Red" { $ANSI = "`e[31m" }
        "Green" { $ANSI = "`e[32m" }
        "Yellow" { $ANSI = "`e[33m" }
        "Blue" { $ANSI = "`e[34m" }
        "Magenta" { $ANSI = "`e[35m" }
        "Cyan" { $ANSI = "`e[36m" }
        "White" { $ANSI = "`e[37m" }
        default { $ANSI = "`e[0m" }
    }

    $Reset = "`e[0m"
    
    if ($NoNewline) {
        Write-Host "${ANSI}${Text}${Reset}" -NoNewline
    } else {
        Write-Host "${ANSI}${Text}${Reset}"
    }
}

if (-Not (Test-Path $filePath)) {
    Write-Color "File path not found: $filePath" "Red"
    exit
}

if (-Not (Test-Path $rceditPath)) {
    Write-Color "rcedit executable not found: $rceditPath" "Red"
    exit
}

$directoryPath = Split-Path -Path $filePath

function Set-Attribute {
    param (
        [string]$attribute,
        [string]$value,
        [string]$description
    )
    Write-Color "-> Setting $description... " "Yellow" -NoNewline
    if ($Verbose) {
        Write-Color "`nCommand: $rceditPath $filePath --set-version-string $attribute $value" "Cyan"
    }
    & $rceditPath $filePath --set-version-string $attribute $value
    if ($?) {
        Write-Color "Success" "Green"
    } else {
        Write-Color "Failed" "Red"
    }
}

Write-Color "Starting to set attributes..." "Cyan"

Set-Attribute "LegalTrademarks" "ScreenSHX" "Legal Trademarks"
Set-Attribute "FileDescription" "Screensharing tool." "File Description"
Set-Attribute "LegalCopyright" "" "Legal Copyright"
Set-Attribute "ProductName" "ScreenSHX" "Product Name"
Set-Attribute "CompanyName" "ScreenSHX" "Company Name"

Write-Color "-> Setting icon... " "Yellow" -NoNewline
if ($Verbose) {
    Write-Color "`nCommand: $rceditPath $filePath --set-icon $directoryPath\resources\app\screenshx.png" "Cyan"
}
& $rceditPath $filePath --set-icon "$directoryPath\resources\app\screenshx.png"
if ($?) {
    Write-Color "Success" "Green"
} else {
    Write-Color "Failed" "Red"
}

Write-Color "Finished setting attributes." "Cyan"