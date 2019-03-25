import {images} from "../assets/example_pics";

export function getDummyImage() {
    let pic = Math.floor(Math.random() * Math.floor(7));
    return images[pic].uri;
}
