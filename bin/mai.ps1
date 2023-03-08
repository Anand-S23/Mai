param (
    [Parameter(Mandatory=$true)]
    [string]$source,
    [Parameter(Mandatory=$true)]
    [string]$shortcut
)

# Getting the correct destination
$destination = "C:\Program Files (x86)\" + (Split-Path -Leaf $source)
$shortcutDestination = Join-Path ([System.Environment]::GetFolderPath("CommonPrograms")) (Split-Path -Leaf $shortcut)

# Move shortcut to Start Menu
Move-Item $shortcut $shortcutDestination -Force
Write-Host "Shortcut moved successfully to Start Menu Programs folder."

# Move source to Program Files (x86)
if (Test-Path $destination) {
    Write-Host "Destination directory already exists."
}
else {
    Move-Item $source $destination
    Write-Host "Directory moved successfully to Program Files."
}
