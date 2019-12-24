import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle `
body{
    padding: 28px 60px;
    font-family: 'Open Sans Condensed';

    @media screen and (max-width: 800px){
        padding: 10px;
    }
}

a {
    text-decoration: none;
    color: black;
}

*{
    box-sizing: border-box;
}
`