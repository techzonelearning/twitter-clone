import DataURIparser from "datauri/parser.js";
import path from "path";
let parser = new DataURIparser();

let getFileURI = (file) => {
  let ext = path.extname(file.originalname).toString();
  return parser.format(ext, file.buffer).content;
};

export default getFileURI;
