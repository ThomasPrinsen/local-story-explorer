import requests
import os

def download_image(url, filename):
    response = requests.get(url)
    if response.status_code == 200:
        with open(os.path.join('public/images', filename), 'wb') as f:
            f.write(response.content)
        print(f"Downloaded {filename}")
    else:
        print(f"Failed to download {filename}")

# Amsterdam images
amsterdam_images = [
    ('https://images.unsplash.com/photo-1512470876302-972faa2aa9a4', 'amsterdam1.jpg'),
    ('https://images.unsplash.com/photo-1584920718830-250a3e6a35f3', 'amsterdam2.jpg'),
    ('https://images.unsplash.com/photo-1612521605237-0024ec952cc5', 'amsterdam3.jpg'),
]

# Utrecht images
utrecht_images = [
    ('https://images.unsplash.com/photo-1541971875076-8f970d573be6', 'utrecht1.jpg'),
    ('https://images.unsplash.com/photo-1562859175-21f739339e08', 'utrecht2.jpg'),
    ('https://images.unsplash.com/photo-1563461661026-49bac0e53d5a', 'utrecht3.jpg'),
]

# Barcelona images
barcelona_images = [
    ('https://images.unsplash.com/photo-1583422409516-2895a77efded', 'barcelona1.jpg'),
    ('https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4', 'barcelona2.jpg'),
    ('https://images.unsplash.com/photo-1539037116277-4db20889f2d4', 'barcelona3.jpg'),
]

# Sevilla images
sevilla_images = [
    ('https://images.unsplash.com/photo-1559682468-a6a29e7d9517', 'sevilla1.jpg'),
    ('https://images.unsplash.com/photo-1512753360435-329c4535a9a7', 'sevilla2.jpg'),
    ('https://images.unsplash.com/photo-1555881400-74d7acaacd8b', 'sevilla3.jpg'),
]

# Download all images
all_images = amsterdam_images + utrecht_images + barcelona_images + sevilla_images
for url, filename in all_images:
    download_image(url, filename) 