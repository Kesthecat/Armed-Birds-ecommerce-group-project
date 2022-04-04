import { createGlobalStyle } from "styled-components";

//some colours - navy purple #645986
//grey with slight violet tinge #DAE0F2
//pewter blue - #85AAC1
//light brown - #A99985
//667761 deep sage
export default createGlobalStyle`
  :root {
    --color-main: #50479A; // dark slate blue
    --color-secondary: 	#ad6f18; // dark maroon
    --color-background: #DAE0F2; 
    --color-text: #555555; //dark gray
    --font-heading: 'Quicksand', Arial, Helvetica, sans-serif;
    --font-subheading: 'Poppins', Arial, Helvetica, sans-serif;
    --font-body: 'Overpass', Arial, Helvetica, sans-serif;
  }

  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }

  //additional resets
  a {
      text-decoration: none;
  }
  button {
      border: none;
      color: white;
      background-color: var(--color-main);
      cursor: pointer;
      border-radius: 5px;
  }

  h1, h2 {
    font-family: var(--font-heading);
}
h3, h4, h5 {
    font-family: var(--font-subheading);
}

p, span {
    font-family: var(--font-body);
}

h1 {
    font-size: 50px;
    font-weight: bold;
    color: var(--color-main);
}

h2 {
    font-size: 36px;
}

h3 { 
    font-size: 24px;
}

h4 { 
    font-size: 20px;
}

p {
    font-size: 18px;
}

`;
