import { zValidator } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import type { ZodType } from "zod";

/**
 * Validates part of the request against a zod schema, rejecting it with a 400 when it does not match.
 *
 * @example
 * new Hono().post("/", validate("json", schema), (c) => c.json(c.req.valid("json")));
 */
export const validate = <Schema extends ZodType, Target extends keyof ValidationTargets>(
  target: Target,
  schema: Schema,
) =>
  zValidator(target, schema, (result, c) => {
    if (!result.success) {
      return c.json({ message: "Invalid request body", issues: result.error.issues }, 400);
    }
  });
