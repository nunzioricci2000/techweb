# Documentation

## Project Philosophy

This project is designed to foster a deeper understanding of web development while embracing modern practices in a streamlined way. Large, complex frameworks are avoided to maintain focus on the core components of web technologies: the browser and the server. This approach ensures a practical grasp of essential web development concepts without unnecessary abstraction.

## Choices That Shape Our Project

The tools and technologies selected prioritize simplicity, flexibility, and alignment with learning goals. Below is an overview of these choices and their rationale:

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

