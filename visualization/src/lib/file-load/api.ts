import {Observable} from "rxjs/Observable";
import {readFile, readFileText, readFileBinary} from "../util/fs";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import {InvalidFileFormat, InvalidFileContent} from "./errors";
import {FileLoadData, FileType} from "./trace-file";
import {Trace} from "../trace/trace";
import {Metadata} from "../trace/metadata";
import {KernelInvocation} from "../proto-bundle";


/**
 * Loads file and parses its content as JSON.
 * @param {File} file
 * @returns {Observable<Object>}
 */
function parseFileJson(file: File): Observable<Trace | Metadata>
{
    return readFileText(file).map(data => JSON.parse(data));
}
/**
 * Loads file and parses its content as Protobuf.
 * @param {File} file
 * @returns {Observable<Object>}
 */
function parseFileProtobuf(file: File): Observable<Trace | Metadata>
{
    return readFileBinary(file).map(data => KernelInvocation.decode(new Uint8Array(data)).toJSON() as any);
}
/**
 * Loads file as JSON or Protobuf, according to the extension (.json or .proto).
 * @param {File} file
 * @returns {Observable<Object>}
 */
function parseFile(file: File): Observable<Trace | Metadata>
{
    if (file.name.match(/\.json$/))
    {
        return parseFileJson(file);
    }
    else if (file.name.match(/\.protobuf$/))
    {
        return parseFileProtobuf(file);
    }
    else return Observable.throw(new InvalidFileFormat());
}

/**
 * Checks validity of trace object.
 * @param {Object} content
 * @returns {Observable<Trace>}
 */
function validateTrace(content: object): boolean
{
    return (
        content["type"] === "trace" &&
        "kernel" in content &&
        "accesses" in content
    );
}
/**
 * Checks validity of metadata object.
 * @param {Object} content
 * @returns {boolean}
 */
function validateMetadata(content: object): boolean
{
    return (
        content["type"] === "metadata" &&
        "kernel" in content
    );
}
/**
 * Checks validity of file content depending on its type.
 * @param {File} file
 * @param {Object} content
 * @returns {boolean}
 */
function validateContent(file: File, content: object): boolean
{
    if (getFileType(file) === FileType.Metadata)
    {
        return validateMetadata(content);
    }
    else return validateTrace(content);
}

/**
 * Returns file type, depending on file name.
 * @param {File} file
 * @returns {FileType}
 */
function getFileType(file: File): FileType
{
    return file.name.match(/.*-metadata\..*/) ? FileType.Metadata : FileType.Trace;
}

/**
 * Loads file, parses it and creates appropriate data structure (trace or metadata).
 * @param {File} file
 * @returns {Observable<FileLoadData>}
 */
export function parseAndValidateFile(file: File): Observable<FileLoadData>
{
    return parseFile(file)
        .do(content => {
            if (!validateContent(file, content))
            {
                throw new InvalidFileContent();
            }
        })
        .map(content => ({
            type: getFileType(file),
            content
        }));
}