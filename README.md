<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/davidgarra/re-react">
    <img src="logo.png" alt="Logo" width="120">
  </a>

<h3 align="center">Re-React</h3>

  <p align="center">
    A minimal React clone created just for fun
    <br />
    <a href="https://github.com/davidgarra/re-react"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/davidgarra/re-react/issues">Report Bug</a>
    ·
    <a href="https://github.com/davidgarra/re-react/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Re-React is a minimal React clone created just for fun and to better understand how the framework works. This project has been inspired by [Build Your Own React](https://pomb.us/build-your-own-react/) work by _Rodrigo Pombo_, but includes some additional features and is developed using TypeScript.

Re-React was developed as part of an in-depth study of React's logic, for personal educational purposes in order to have a deeper understanding of how the framework works under the hood, and not intended as a library for daily use.

The main features of Re-React include:
- **Reconciliation**: Based on the fiber tree data structure, after any update from the UI only the actual changes are passed to the renderer.
- **Interruptible Rendering**: The work is split into little chunks of works, so that the rendering can be interrupted if the browser needs to do high priority stuff like handling user input or keeping an animation smooth
- **Function Component**: Just like in React, it is possible to define custom components in the form of a JavaScript function.
- **Hook**: Currently, the following hooks have been implemented:
   - _useState_
   - _useEffect_

The additional features (not implemented in the inspiring project) are:
- Handling of array of children
- Conditional rendering using `false` value
- State update for the _useState_ hook using an object
- Implementation of the _useEffect_ hook

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![JavaScript][javascript-shield]][javascript-url]
- [![TypeScript][typescript-shield]][typescript-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

1. **Clone the repository**

   HTTPS:

   ```sh
   git clone https://github.com/davidgarra/re-react.git
   ```

   SSH:

   ```sh
   git clone git@github.com:davidgarra/re-react.git
   ```

2. **Install dependencies using yarn**

   ```shell
   cd re-react
   yarn
   ```

4. **Run the application**

   ```sh
   yarn start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

See the [open issues](https://github.com/davidgarra/re-react/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

David Garra - [Linkedin](https://www.linkedin.com/in/david-garra/) - david.garra92@gmail.com

Project Link: [https://github.com/davidgarra/re-react](https://github.com/davidgarra/re-react)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/davidgarra/re-react.svg?style=for-the-badge
[contributors-url]: https://github.com/davidgarra/re-react/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/davidgarra/re-react.svg?style=for-the-badge
[forks-url]: https://github.com/davidgarra/re-react/network/members
[stars-shield]: https://img.shields.io/github/stars/davidgarra/re-react.svg?style=for-the-badge
[stars-url]: https://github.com/davidgarra/re-react/stargazers
[issues-shield]: https://img.shields.io/github/issues/davidgarra/re-react.svg?style=for-the-badge
[issues-url]: https://github.com/davidgarra/re-react/issues
[license-shield]: https://img.shields.io/github/license/davidgarra/re-react.svg?style=for-the-badge
[license-url]: https://github.com/davidgarra/re-react/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/david-garra
[javascript-shield]: https://img.shields.io/badge/JavaScript-20232A?style=for-the-badge&logo=JavaScript
[javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[typescript-shield]: https://img.shields.io/badge/TypeScript-20232A?style=for-the-badge&logo=typescript
[typescript-url]: https://www.typescriptlang.org/
