import { suite, test } from "node:test";
import assert from "node:assert";
import Image from "#core/entities/image.js";

suite("Image", () => {
  test("valid URL", () => {
    const image = new Image({ url: "https://example.com/image.jpg" });
    assert.strictEqual(image.url, "https://example.com/image.jpg");
  });

  test("getter returns private value", () => {
    const image = new Image({ url: "https://example.com/photo.png" });
    assert.strictEqual(image.url, "https://example.com/photo.png");
    assert.strictEqual(typeof image.url, "string");
  });

  suite("validation errors", () => {
    test("non-string URL throws TypeError", () => {
      assert.throws(
        () => new Image({ url: 12345 }),
        TypeError,
        "Image URL must be a string",
      );
    });

    test("null URL throws TypeError", () => {
      assert.throws(
        () => new Image({ url: null }),
        TypeError,
        "Image URL must be a string",
      );
    });

    test("undefined URL throws TypeError", () => {
      assert.throws(
        () => new Image({ url: undefined }),
        TypeError,
        "Image URL must be a string",
      );
    });
  });
});
