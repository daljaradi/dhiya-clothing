import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle `
body{
    padding: 28px 60px;
    font-family: 'Open Sans Condensed';

    @media screen and (max-width: 800px){
        padding: 10px;
        margin: 0;
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