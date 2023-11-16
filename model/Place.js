export class Place {
  constructor(title, imageUri, location, id) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = "address"; // since i dont have google maps acc
    this.location = { lat: location.lat, lng: location.lng };
    // this.id = new Date().toString() + Math.random().toString();
    this.id=id;
  }
}
