import { suite, test } from "node:test";
import assert from "node:assert";
import Geolocation from "#core/entities/geolocation.js";

suite("Geolocation", () => {
  test("valid coordinates", () => {
    const geo = new Geolocation({ latitude: 40.7128, longitude: -74.006 });
    assert.strictEqual(geo.latitude, 40.7128);
    assert.strictEqual(geo.longitude, -74.006);
  });

  suite("boundary values", () => {
    test("latitude - north pole", () => {
      const geo = new Geolocation({ latitude: 90, longitude: 0 });
      assert.strictEqual(geo.latitude, 90);
    });

    test("latitude - south pole", () => {
      const geo = new Geolocation({ latitude: -90, longitude: 0 });
      assert.strictEqual(geo.latitude, -90);
    });

    test("longitude - east", () => {
      const geo = new Geolocation({ latitude: 0, longitude: 180 });
      assert.strictEqual(geo.longitude, 180);
    });

    test("longitude - west", () => {
      const geo = new Geolocation({ latitude: 0, longitude: -180 });
      assert.strictEqual(geo.longitude, -180);
    });
  });

  suite("validation errors", () => {
    test("latitude too high throws RangeError", () => {
      assert.throws(
        () => new Geolocation({ latitude: 91, longitude: 0 }),
        RangeError,
        "Latitude must be between -90 and 90",
      );
    });

    test("latitude too low throws RangeError", () => {
      assert.throws(
        () => new Geolocation({ latitude: -91, longitude: 0 }),
        RangeError,
        "Latitude must be between -90 and 90",
      );
    });

    test("longitude too high throws RangeError", () => {
      assert.throws(
        () => new Geolocation({ latitude: 0, longitude: 181 }),
        RangeError,
        "Longitude must be between -180 and 180",
      );
    });

    test("longitude too low throws RangeError", () => {
      assert.throws(
        () => new Geolocation({ latitude: 0, longitude: -181 }),
        RangeError,
        "Longitude must be between -180 and 180",
      );
    });

    test("non-number latitude throws TypeError", () => {
      assert.throws(
        () => new Geolocation({ latitude: "40.7128", longitude: -74.006 }),
        TypeError,
        "Latitude and Longitude must be numbers",
      );
    });

    test("non-number longitude throws TypeError", () => {
      assert.throws(
        () => new Geolocation({ latitude: 40.7128, longitude: "-74.0060" }),
        TypeError,
        "Latitude and Longitude must be numbers",
      );
    });
  });

  test("getters return private values", () => {
    const geo = new Geolocation({ latitude: 51.5074, longitude: -0.1278 });
    assert.strictEqual(geo.latitude, 51.5074);
    assert.strictEqual(geo.longitude, -0.1278);
    assert.strictEqual(typeof geo.latitude, "number");
    assert.strictEqual(typeof geo.longitude, "number");
  });
});
