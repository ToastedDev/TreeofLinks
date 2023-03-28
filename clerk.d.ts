import { type Metadata } from "./src/utils/profile";

declare global {
  type UserPublicMetadata = Metadata;
}
