# Create images directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "public/images"

# Function to download image
function Download-Image {
    param(
        [string]$Url,
        [string]$FilePath
    )
    try {
        Invoke-WebRequest -Uri $Url -OutFile $FilePath
        Write-Host "Downloaded $FilePath"
    } catch {
        Write-Host "Failed to download $FilePath"
    }
}

# Amsterdam images
$amsterdamImages = @(
    @{Url="https://images.unsplash.com/photo-1512470876302-972faa2aa9a4"; File="amsterdam1.jpg"},
    @{Url="https://images.unsplash.com/photo-1558551649-e44c8f992010"; File="amsterdam2.jpg"},
    @{Url="https://images.unsplash.com/photo-1612521605237-0024ec952cc5"; File="amsterdam3.jpg"}
)

# Utrecht images
$utrechtImages = @(
    @{Url="https://images.unsplash.com/photo-1541971875076-8f970d573be6"; File="utrecht1.jpg"},
    @{Url="https://images.unsplash.com/photo-1587974928442-77dc3e0dba72"; File="utrecht2.jpg"},
    @{Url="https://images.unsplash.com/photo-1541971875076-8f970d573be6?w=800"; File="utrecht3.jpg"}
)

# Barcelona images
$barcelonaImages = @(
    @{Url="https://images.unsplash.com/photo-1583422409516-2895a77efded"; File="barcelona1.jpg"},
    @{Url="https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4"; File="barcelona2.jpg"},
    @{Url="https://images.unsplash.com/photo-1539037116277-4db20889f2d4"; File="barcelona3.jpg"}
)

# Sevilla images
$sevillaImages = @(
    @{Url="https://images.unsplash.com/photo-1559682468-a6a29e7d9517"; File="sevilla1.jpg"},
    @{Url="https://images.unsplash.com/photo-1512753360435-329c4535a9a7"; File="sevilla2.jpg"},
    @{Url="https://images.unsplash.com/photo-1555881400-74d7acaacd8b"; File="sevilla3.jpg"}
)

# Download all images
$allImages = $amsterdamImages + $utrechtImages + $barcelonaImages + $sevillaImages
foreach ($image in $allImages) {
    Download-Image -Url $image.Url -FilePath "public/images/$($image.File)"
} 