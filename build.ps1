param (
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

function Package-App {
    param (
        [string]$Platform,
        [string]$Command
    )

    Write-Color "Packaging for $Platform..." "Yellow"
    if ($Verbose) {
        Write-Color "Command: npm run $Command" "Cyan"
    }
    npm run $Command
    if ($?) {
        Write-Color "Packaging successful for $Platform" "Green"
    } else {
        Write-Color "Packaging failed for $Platform" "Red"
    }
}

Write-Color "Starting packaging process..." "Cyan"

Package-App -Platform "Windows" -Command "package:win"
Package-App -Platform "macOS" -Command "package:mac"
Package-App -Platform "Linux" -Command "package:linux"

Write-Color "Packaging process completed." "Cyan"