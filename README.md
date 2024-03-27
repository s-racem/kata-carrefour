# KataCarrefour

# Architecture
|-app<br />
|&nbsp; &nbsp; &nbsp;|src<br />
|&nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|-header component<br />
|&nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|-components (contains the list of components of the app)<br />
|&nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|-cart-item component<br />
|&nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|-cart-page component<br />
|&nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|-mini-cart component<br />
|&nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|-product-card component<br />
|&nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|-product-description component<br />
|&nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|-products component<br />
|&nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|-layout (contains the list of layouts of the app)<br />
|&nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|-top-bar component<br />
|&nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|-models (contains the interfaces)<br />
|&nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|-cartProduct model<br />
|&nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; &nbsp;|-product model<br />
|&nbsp; &nbsp; &nbsp;|-services (contains the services we use to communicate between components)<br />
|&nbsp; &nbsp; &nbsp;|-store (NgRx concepts: action, reducer, state and selector)<br />
|&nbsp; &nbsp; &nbsp;|-utils (contains the list of utils methods)<br />
|-assets<br />
&nbsp; &nbsp; &nbsp;|-carrefour-logo.svg<br />
&nbsp; &nbsp; &nbsp;|-carrefour-logo-responsive.svg<br />


# setup and run
1- npm install<br />
2- npm start<br />
3- open http://localhost:4200<br />

# List of features

feature 1: fetch and display the list of products<br />
feature 2: add products to the shopping cart and view the cart<br />
feature 3: display detailsof product<br />
