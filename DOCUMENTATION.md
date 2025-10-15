# Documentation

## Project Philosophy

This project is designed to foster a deeper understanding of web development while embracing modern practices in a streamlined way. Large, complex frameworks are avoided to maintain focus on the core components of web technologies: the browser and the server. This approach ensures a practical grasp of essential web development concepts without unnecessary abstraction.

## Choices That Shape The Project

The tools and technologies and architectural choices selected prioritize simplicity, flexibility, and alignment with learning goals. Below is an overview of these choices and their rationale:

### Working without classes

```mjs
/// An example with classes
export class AuthService {
    #authRepository;

    constructor(authRepository) {
        this.#authRepository = authRepository;
    }

    register(username, password) {
        #authRepository.createUser({username, password});
    }
}
```
```mjs
/// Example of usage
import { AuthRepository } from './auth.repositiry.js';
import { AuthService } from './auth.service.js';
/// ...other code...
const authRepository = new AuthRepository(db);
const authService = new AuthService(authRepository);
/// ...other code...
authService.register(username, password);
```

During the early stages of development I had to cope with some stylistic and projectual choices to start writing code. From the beginning I choose to not use JavaScript classes, this is a modern approch that enhance code quality and promotes functional programming and all the advantages that this involves.

```mjs
/// An example with functions
export function AuthService({ authRepository }) {
    return {
        register(username, password) {
            authRepository.createUser({ username, password });
        },
    };
}
```
```mjs
/// Example of usage
import { AuthRepository } from './auth.repositiry.js';
import { AuthService } from './auth.service.js';
/// ...other code...
const authRepository = AuthRepository(db);
const authService = AuthService(authRepository);
/// ...other code...
```

Anyway I felt that this type of initialization was too verbose and I choose to semplify more and more, using the tools natively provided by node.js. So I removed factory functions and I used naked functions and imports:

```mjs
/// An example with bare methods
import authRepository from './auth.repository.js';

export function register(username, password) {
    authRepository.createUser({ username, password });
}

export default { register };
```
```mjs
/// Example of usage
import authService from './auth.service.js';
authService.register(username, password);
```

### Preact

Preact is a lightweight JavaScript library that serves as an efficient alternative to heavier frameworks. Its benefits include:

- **Small Footprint**: Preact’s minimal size improves performance and reduces complexity.
- **Unopinionated Design**: It offers flexibility, allowing experimentation with JavaScript without strict constraints.
- **Browser-Native**: Preact runs directly in the browser, eliminating the need for compilation.

This makes Preact ideal for building a strong foundation in web development while using a modern component-based approach.

### HTM over JSX

JSX requires preprocessors to convert its syntax into standard JavaScript, adding complexity. HTM is chosen instead for these reasons:

- **Preact Compatibility**: HTM is officially supported by Preact, ensuring smooth integration.
- **No Build Step**: HTM runs natively in the browser, supporting a simpler workflow.
- **Standard JavaScript**: Using tagged template literals, HTM aligns closely with native JavaScript, enhancing clarity.

HTM supports a focus on coding fundamentals without the overhead of additional build processes.

### Modern Web suite // TODO: FINIRE

This project uses tools from the Modern Web suite, such as @web/dev-server, for their simplicity and transparency. They were chosen for their clarity: they do exactly what they promise, without unnecessary features. The main advantages include:

- **Intuitive Interface**: Modern Web tools are easy to use and do not add unnecessary complexity.
- **Minimal Invasiveness**: Although some tools in the suite may rely on dependencies such as Babel (which may not be ideal), their impact is limited and well defined.
- **Extreme Flexibility**: These tools are minimally invasive, allowing you to easily abandon or replace them—even in a single day—if the project requires it.

#### Why not a No-Build Worflow?

The project aims to minimize "build steps" to streamline development and reduce complexity. While a no-build workflow is ideal, certain tools may still require minimal processing. The goal is to keep these steps as simple and unobtrusive as possible, ensuring that the core learning experience remains focused on fundamental web technologies.

Using a no-build workflow would require tools like *import maps*, but this approach presents challenges: it either requires external dependencies (physically external, hosted on another server) or involves workarounds to serve them locally from the node_modules folder. These solutions would be somewhat hacky and lack elegance, which conflicts with the project's philosophy of simplicity and clarity.

### Pico CSS

As an educational project, my focus is on learning and understanding modern web development concepts. Whilst styling is important, CSS is covered in depth during the lectures and his understanding is provided by the written exam. For this reason, I opted for a minimalist CSS framework that allows me to focus on an important aspect of web development: semantic HTML.
In this project, I chose Pico CSS in its class-less version for the following reasons:

- **Minimalist Design**: Pico CSS offers a clean and simple aesthetic that enhances the user interface without overwhelming it.
- **Class-less Approach**: In this way, the library gives its best when semantic HTML is used, promoting good coding practices.
- **Ease of Use**: Pico CSS is straightforward to implement, making it ideal for educational purposes where the focus is on learning rather than complex styling.

### Why not a `static` folder?

As said, the project is intended to have as less "build steps" as possibile (ideally zero) for this reason seams unnecessary to have a `static` folder, since all the files in `src` are served nearly as-is.

### Why ESLint?

ESLint is chosen to maintain code quality and consistency across the project. Its benefits include:
- **Error Detection**: ESLint helps identify potential issues and bugs in the code early in the development process.
- **Code Consistency**: It enforces coding standards and best practices, ensuring a uniform style throughout the codebase.