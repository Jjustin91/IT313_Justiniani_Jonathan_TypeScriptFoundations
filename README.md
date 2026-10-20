# IT313 Laboratory 3: TypeScript Foundations for React Native

## Overview
This project refactors the untyped JavaScript registrar eligibility utility from Laboratory 2 into a robust, strictly typed TypeScript application. It eliminates runtime vulnerabilities through static compile-time type verification, structured object models, enumerations, type narrowing, and generics.

## TypeScript Concepts Applied
1. Basic Type Annotations (`string`, `number`, `boolean`)**: Applied across function parameters, returns, and variables to enforce strict primitive types.
2. Enums (`EnrollmentStatus`): Replaced raw magic strings (`"PASSING"`, `"PROBATION"`) with an enumerated type to eliminate casing and typographical bugs.
3. Interfaces (`Enrollee`, `EligibilityReport`): Established strict structural contracts for raw student records and final eligibility reports.
4. Optional Properties (`remarks?`): Allows `remarks` to exist conditionally on `EligibilityReport` records without violating type checks.
5. Union Types & Type Narrowing (`string | number`)**: Represents API identifiers that can arrive in multiple primitive formats, using runtime `typeof` guard checks so TypeScript can narrow the type before member access.
6. Generics (`groupBy<T>`): Provides a reusable, type-safe data aggregation function that preserves underlying item types.
7. Async/Await & Promises (`Promise<Enrollee[]>`): Simulates remote asynchronous registrar API fetches, enclosed in `try/catch` blocks for resilient failure handling.

### Interface vs. Type Alias Comparison
- Interfaces: Ideal for declaring structural shapes of objects and data entities. They support declaration merging and explicit `extends` inheritance, making them standard for component props and state in React Native.
- Type Aliases: Capable of representing primitive unions, intersections, tuples, and mapped types.
- Decision: `EligibilityReport` is implemented as an `interface` because it represents a clear entity model that can be extended in future modules (e.g., adding scholarship details).

## Setup and Execution

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
```bash
npm install