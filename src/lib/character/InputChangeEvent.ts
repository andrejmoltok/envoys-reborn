import { ChangeEvent } from "react";

export type InputChangeEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>;
