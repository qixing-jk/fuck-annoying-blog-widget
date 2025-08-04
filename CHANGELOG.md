# [1.6.0](https://github.com/qixing-jk/fuck-annoying-blog-widget/compare/v1.5.0...v1.6.0) (2025-08-03)


### Bug Fixes

* correct i18n translation parameter format in event interceptors ([257841d](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/257841df4d3fe9300b0bc4edcf052e0f60cb9ac0))


### Features

* reduce false positives in DOM target filtering ([962cdd8](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/962cdd833faa4152d09bd56716f5fc099dbf9611))
* remove page reload after closing settings panel ([a2de9f9](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/a2de9f98deb42fdb7d918c01341fa6aa53db4655))



# [1.5.0](https://github.com/qixing-jk/fuck-annoying-blog-widget/compare/v1.4.2...v1.5.0) (2025-08-03)


### Features

* add injectReactWithShadow utility function ([19ed891](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/19ed891e505191a7e10f4b1199045e58693d41c6))
* add SwitchPill component and integrate into SettingsPanel ([37390c8](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/37390c8238d1bda3c787f3111411dba0c508c6c2))
* add unsaved changes handling and success notifications ([f80b9bf](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/f80b9bf579fde83f246960c305e7257e92a67b93))
* **banner:** add notification banner component with shadow DOM support ([70368c5](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/70368c50c74b638961c8f136caccc6af8e9d4d23))
* **modal:** add modal component with shadow DOM support and animation effects ([957de10](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/957de10d7566e033545d3048a50bda06d6aeeb48))
* **settings:** add save and refresh functionality with UI improvements ([bf66b30](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/bf66b3037c3018b227617212981ab28f2ce729c6))



## [2.0.0](https://github.com/qixing-jk/fuck-annoying-blog-widget/compare/v1.6.0...v2.0.0) (2025-08-04)


### ⚠ BREAKING CHANGES

* **autoExpandCodeBlocks:** autoExpandCodeBlocks config changes from boolean to object

### Features

* add deepmergeNoArray utility function ([13ed0fd](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/13ed0fdaa022d73e37fc51eef084e1b7f784fe9c))
* **autoExpandCodeBlocks:** enhance feature with configurable selectors and error handling ([9a1e544](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/9a1e5445fdeb48ce9a1433473e9fd1823e4b9ca2))
* **config:** reorganize type definitions and feature registration ([ffd7323](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/ffd7323b4256126968c822852335ca1cc0dcdb99))
* **SettingsPanel:** add CSS selectors configuration for auto-expand code blocks feature ([45a562a](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/45a562a01f35ef9d7a87e9b0d8eec1e3e87c5f8a))
* **SettingsPanel:** improve selectors handling and cleanup ([60e7cc1](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/60e7cc1919ca930ec3fa35f63c8b11da11c7463a))
* **SettingsPanel:** remove unused 't' parameter and adjust close behavior ([0d45522](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/0d455222029853f86ca04ace9ba3ca722d9c7bc9))


### Bug Fixes

* add missing issues write permission to release workflow ([e108755](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/e1087553cfdc078c45a052eba3885753e12cf755))
* **ci:** add missing checkout step in release workflow ([2ba8541](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/2ba854106de348b90d6a87910d2f275238c96b06))
* **ci:** correct condition for release workflow steps ([7e9f429](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/7e9f42971ad1a68dd0a0d410ee19b7ee941018d6))
* **ci:** update release-pr workflow for proper commit and push handling ([e0a7a64](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/e0a7a64cb99138b64cdf0c4af1e272d1e3613231))
* **SettingsPanel:** handle empty lines in textarea input ([b27a7dc](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/b27a7dcc47c4b6e50fa94e1d8de4cc5c59416512))
* **SettingsPanel:** update FeatureList import path for TabType ([25db5a9](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/25db5a99ee90fa8af2239a71030ab251e6226814))

## [1.4.2](https://github.com/qixing-jk/fuck-annoying-blog-widget/compare/v1.4.1...v1.4.2) (2025-08-03)


### Bug Fixes

* **workflow:** ensure release runs after build ([6aa69c8](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/6aa69c824f2351c3b894d3a7ea8bf7bd0850ea6b))



## [1.4.1](https://github.com/qixing-jk/fuck-annoying-blog-widget/compare/v1.4.0...v1.4.1) (2025-08-03)


### Performance Improvements

* implement lazy loading for React UI components ([1d5fe22](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/1d5fe22a2ae64da430bb37e238e80cba4200a36a))



# [1.4.0](https://github.com/qixing-jk/fuck-annoying-blog-widget/compare/v1.3.0...v1.4.0) (2025-08-03)


### Features

* **ci:** move release workflow into build.yml and update changelog action ([db461c3](https://github.com/qixing-jk/fuck-annoying-blog-widget/commit/db461c3eca58973f87d7d5d44ef1be4b5dd185ed))
