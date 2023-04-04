// snakeCase converts a string to snake_case
// by replacing all uppercase characters with an underscore
// followed by the lowercase version of the character.
// Example: "helloWorld" -> "hello_world"
//
// Note: This function only works for ASCII characters.

export function snakeCase(str) {
  if (typeof str !== "string") {
    throw new Error("str must be a string");
  }

  return str.replace(/([A-Z])/g, (g) => `_${g[0].toLowerCase()}`);
}

// This code creates a Proxy object that will return a function that returns the value passed to it if the key is not found on the resolver object.
// It uses the get trap to return a function that returns the value passed to it if the key is not found on the resolver object.
export function createResolver(resolver) {
  return new Proxy(resolver, {
    get(target, key, receiver) {
      if (key in target) return target[key];
      return (value) => value;
    },
  });
}

export function jsonify(obj) {
  return JSON.parse(JSON.stringify(obj));
}
