import Ajv, { type AnySchema } from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export function validateJSONSchema(data: unknown, schema: AnySchema): void {
  const validate = ajv.compile(schema);

  if (!validate(data)) {
    throw new Error(
      `JSON Schema validation failed:\n${JSON.stringify(validate.errors, null, 2)}`
    );
  }
}