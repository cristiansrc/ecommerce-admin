export default function fileToBase64(fileToLoad, onSuccess) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(fileToLoad);
    fileReader.onload = (e) => onSuccess(e.target.result, fileToLoad.name); 
    fileReader.onerror = (error) => console.log(error);
}