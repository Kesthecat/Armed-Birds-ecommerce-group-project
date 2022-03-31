import { createGlobalStyle } from "styled-components";


//some colours - navy purple #645986
//grey with slight violet tinge #DAE0F2
//pewter blue - #85AAC1
//light brown - #A99985
export default createGlobalStyle`
  :root {
    --color-main: #50479A; // dark slate blue
    --color-secondary: 	#84A98C; //dark sea green
    --color-background: #CAD2C5; //ash grey
    --font-heading: 'Comfortaa', Arial, Helvetica, sans-serif;
    --font-body: 'Nanum Gothic', Arial, Helvetica, sans-serif;
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
  }

  h1, h2, h3, h4, h5 {
    font-family: var(--font-heading);
}

p {
    font-family: var(--font-body);
}

`

