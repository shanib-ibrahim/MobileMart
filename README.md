\# Product Management App

A React + Vite application to manage products with add, edit, delete, and search functionality. The app uses \*\*Redux Toolkit Query (RTK Query)\*\* to fetch data from a mock \*\*JSON Server\*\* and is styled with \*\*SCSS modules\*\*. Integration tests are written using \*\*Jest\*\* and \*\*React Testing Library\*\*.

\---

\## Features

\- Add, edit, and delete products.

\- Search products by name.

\- Display a list of products with price, rating, and discount.

\- Confirmation modal for delete operations.

\- Responsive UI using SCSS grid layout.

\- Integration testing for key features.

\---

\## Tech Stack

\- React 18 + Vite

\- TypeScript

\- Redux Toolkit & RTK Query

\- SCSS Modules

\- JSON Server (mock API)

\- Jest + React Testing Library (integration tests)

\---

\## Prerequisites

\- Node.js >= 16.x

\- npm >= 8.x

\---

\## Project Setup

1\. \*\*Clone the repository:\*\*

\`\`\`bash

git clone

cd

Install dependencies:

npm install

JSON Server Setup (Mock API)

Create a db.json file in the root directory:

{

"products": \[

{

"id": 1,

"name": "Product A",

"price": 100,

"old_price": 120,

"rating": 4,

"reviews": 10,

"discount": "20%"

}

\]

}

Install JSON Server globally (if not already installed):

npm install -g json-server

Run the mock API:

json-server --watch db.json --port 4000

The API will be available at http://localhost:4000/products.

Running the App

npm run dev

The app will be served at http://localhost:5173 (default Vite port).

Folder Structure

src/

├─ components/

│ ├─ common/

│ │ ├─ modal/

│ │ └─ loader/

│ ├─ layout/

│ └─ products/

│ ├─ ProductCard.tsx

│ ├─ ProductForm.tsx

│ └─ index.tsx (Products Page)

├─ features/

│ └─ productSlice.ts

├─ services/

│ └─ productApi.ts

└─ types/

└─ product.type.ts

RTK Query Setup

The app uses RTK Query for data fetching:

getProducts – Fetches all products.

addProduct – Adds a new product.

updateProduct – Updates an existing product.

deleteProduct – Deletes a product.

Jest & Testing Setup

Install testing dependencies:

npm install -D jest @types/jest babel-jest @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event identity-obj-proxy ts-node

Create jest.setup.ts:

import '@testing-library/jest-dom';

Create jest.config.ts:

export default {

testEnvironment: 'jest-environment-jsdom',

setupFilesAfterEnv: \['/jest.setup.ts'\],

moduleNameMapper: {

'\\\\.(css|scss)$': 'identity-obj-proxy',

'\\\\.(gif|ttf|eot|svg|png)$': '/test/mocks/fileMock.js',

'^@/(.\*)$': '/src/$1',

},

};

Create .babelrc for TSX support:

{

"presets": \[

\["@babel/preset-env", { "targets": { "esmodules": true } }\],

\["@babel/preset-react", { "runtime": "automatic" }\],

"@babel/preset-typescript"

\]

}

Add scripts to package.json:

{

"scripts": {

"test": "jest --watchAll",

"cov": "jest --coverage --collectCoverageFrom='src/\*\*/\*.{ts,tsx}'"

}

}

Running Tests

npm run test

Tests include:

Adding a new product

Editing a product

Deleting a product

Validating input fields

Rendering product list

Design Choices

RTK Query: Simplifies API calls and caching.

SCSS Modules: Component-level scoped styling.

GlobalModal: Reusable modal for add/edit/delete actions.

Integration Tests: Covers critical user flows.

Known Issues / Limitations

Only works with local JSON Server.

No user authentication.

Data is not persisted across server restarts unless saved in db.json.
