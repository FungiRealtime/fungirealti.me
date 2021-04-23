var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __objSpread = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// <stdin>
__markAsModule(exports);
__export(exports, {
  assets: () => import_assets.default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler2/shims/react.ts
var React = __toModule(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_server2 = __toModule(require("react-dom/server"));

// node_modules/@remix-run/react/browser.js
var import_react4 = __toModule(require("react"));
var import_history = __toModule(require("history"));

// node_modules/@remix-run/react/_virtual/_rollupPluginBabelHelpers.js
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

// node_modules/@remix-run/react/components.js
var import_react3 = __toModule(require("react"));
var import_react_router_dom2 = __toModule(require("react-router-dom"));
var import_react_router_dom3 = __toModule(require("react-router-dom"));

// node_modules/@remix-run/react/data.js
function isErrorResponse(response) {
  return response instanceof Response && response.headers.get("X-Remix-Error") != null;
}
function isRedirectResponse(response) {
  return response instanceof Response && response.headers.get("X-Remix-Redirect") != null;
}
async function fetchData(location, routeId, formSubmit) {
  let origin = window.location.origin;
  let url = new URL(location.pathname + location.search, origin);
  url.searchParams.set("_data", routeId);
  url.searchParams.sort();
  let init = getFetchInit(formSubmit);
  let response = await fetch(url.href, init);
  if (isErrorResponse(response)) {
    let data = await response.json();
    let error = new Error(data.message);
    error.stack = data.stack;
    return error;
  }
  return response;
}
async function extractData(response) {
  if (response instanceof Error)
    return null;
  let contentType = response.headers.get("Content-Type");
  if (contentType && /\bapplication\/json\b/.test(contentType)) {
    return response.json();
  }
  return response.text();
}
function getFetchInit(formSubmit) {
  if (!formSubmit) {
    return {
      credentials: "same-origin"
    };
  }
  let body = formSubmit.encType === "application/x-www-form-urlencoded" ? new URLSearchParams(formSubmit.data) : formSubmit.data;
  return {
    method: formSubmit.method,
    body,
    credentials: "same-origin",
    headers: {
      "Content-Type": formSubmit.encType
    }
  };
}

// node_modules/@remix-run/react/invariant.js
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
var invariant_default = invariant;

// node_modules/@remix-run/react/markup.js
function createHtml(html) {
  return {
    __html: html
  };
}

// node_modules/@remix-run/react/routeModules.js
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await import(route.module);
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error) {
    window.location.reload();
    return new Promise(() => {
    });
  }
}

// node_modules/@remix-run/react/routes.js
var import_react = __toModule(require("react"));
var import_react_router_dom = __toModule(require("react-router-dom"));
function createClientRoute(entryRoute, Component) {
  return {
    path: entryRoute.path,
    caseSensitive: !!entryRoute.caseSensitive,
    id: entryRoute.id,
    element: /* @__PURE__ */ import_react.default.createElement(Component, {
      id: entryRoute.id
    })
  };
}
function createClientRoutes(routeManifest, Component, parentId) {
  return Object.keys(routeManifest).filter((key) => routeManifest[key].parentId === parentId).map((key) => {
    let route = createClientRoute(routeManifest[key], Component);
    let children = createClientRoutes(routeManifest, Component, route.id);
    if (children.length > 0)
      route.children = children;
    return route;
  });
}
function createClientMatches(matches, elementType) {
  return matches.map((match) => __objSpread(__objSpread({}, match), {
    route: createClientRoute(match.route, elementType)
  }));
}
function matchClientRoutes(routes2, location) {
  let matches = (0, import_react_router_dom.matchRoutes)(routes2, location);
  invariant_default(matches, "Missing matches");
  return matches.map((match) => ({
    params: match.params,
    pathname: match.pathname,
    route: match.route
  }));
}

// node_modules/@remix-run/react/errorBoundaries.js
var import_react2 = __toModule(require("react"));
var RemixErrorBoundary = class extends import_react2.default.Component {
  state = {
    error: this.props.error || null,
    location: this.props.location
  };
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location) {
      return {
        error: props.error || null,
        location: props.location
      };
    }
    return state;
  }
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ import_react2.default.createElement(this.props.component, {
        error: this.state.error
      });
    } else {
      return this.props.children;
    }
  }
};
function RemixRootDefaultErrorBoundary({
  error
}) {
  console.error(error);
  return /* @__PURE__ */ import_react2.default.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ import_react2.default.createElement("head", null, /* @__PURE__ */ import_react2.default.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ import_react2.default.createElement("title", null, "Uncaught Exception!")), /* @__PURE__ */ import_react2.default.createElement("body", null, /* @__PURE__ */ import_react2.default.createElement("main", {
    style: {
      border: "solid 2px hsl(10, 50%, 50%)",
      padding: "2rem"
    }
  }, /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("h1", null, "Uncaught Exception!"), /* @__PURE__ */ import_react2.default.createElement("p", null, "If you are not the developer, please click back in your browser and try again."), /* @__PURE__ */ import_react2.default.createElement("div", {
    style: {
      fontFamily: `"SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace`,
      padding: "1rem",
      margin: "1rem 0",
      border: "solid 4px"
    }
  }, error.message), /* @__PURE__ */ import_react2.default.createElement("p", null, "There was an uncaught exception in your application. Check the browser console and/or server console to inspect the error."), /* @__PURE__ */ import_react2.default.createElement("p", null, "If you are the developer, consider adding your own error boundary so users don't see this page when unexpected errors happen in production!"), /* @__PURE__ */ import_react2.default.createElement("p", null, "Read more about", " ", /* @__PURE__ */ import_react2.default.createElement("a", {
    target: "_blank",
    rel: "noreferrer",
    href: "https://remix.run/dashboard/docs/errors"
  }, "Error Handling in Remix"), ".")))));
}

// node_modules/@remix-run/react/links.js
async function preloadBlockingLinks(routeModule, data) {
  if (!routeModule.links) {
    return [];
  }
  let descriptors = routeModule.links({
    data
  });
  if (!descriptors)
    return [];
  let blockingLinks = [];
  for (let descriptor of descriptors) {
    if (isPageLinkDescriptor(descriptor))
      continue;
    if (isBlockLinkDescriptor(descriptor)) {
      blockingLinks.push(descriptor.link);
    } else if (descriptor.rel === "stylesheet") {
      blockingLinks.push(__objSpread(__objSpread({}, descriptor), {
        rel: "preload",
        as: "style"
      }));
    }
  }
  return Promise.all(blockingLinks.map(preloadBlockingLink));
}
async function preloadBlockingLink(descriptor) {
  if (descriptor.rel !== "preload" || !descriptor.as || !descriptor.href) {
    console.warn(`Can only block links with the following shape: \`{ rel: "preload", as: string, href: string }\`, ignoring: ${JSON.stringify(descriptor)}`);
    return;
  }
  return new Promise((resolve) => {
    let link = document.createElement("link");
    Object.assign(link, descriptor);
    link.onload = async () => {
      try {
        document.head.removeChild(link);
      } catch (error) {
      }
      if (link.as === "image") {
        await moveImageFromDiskToMemoryCacheToAvoidLayoutShift(descriptor.href);
      }
      resolve();
    };
    document.head.appendChild(link);
  });
}
function moveImageFromDiskToMemoryCacheToAvoidLayoutShift(src) {
  return new Promise((resolve) => {
    let img = document.createElement("img");
    img.src = src;
    img.style.position = "absolute";
    img.style.left = "-9999px";
    img.onload = () => {
      document.body.removeChild(img);
      resolve();
    };
    document.body.appendChild(img);
  });
}
function getLinks(location, matches, routeData, routeModules, manifest, clientRoutes) {
  let descriptors = matches.map((match) => {
    let module2 = routeModules[match.route.id];
    if (module2.links) {
      let data = routeData[match.route.id];
      return module2.links({
        data
      });
    }
    return [];
  }).flat(1);
  let htmlLinkDescriptors = descriptors.map((descriptor) => {
    if (isPageLinkDescriptor(descriptor)) {
      return getPageLinkDescriptors(descriptor, location, matches, manifest, clientRoutes);
    } else if (isBlockLinkDescriptor(descriptor)) {
      return [descriptor.link];
    } else if (descriptor.rel === "stylesheet") {
      let _a = descriptor, {
        type,
        rel
      } = _a, rest = __objRest(_a, [
        "type",
        "rel"
      ]);
      return [__objSpread({
        rel: "preload",
        as: "style"
      }, rest), descriptor];
    } else {
      return [descriptor];
    }
  }).flat(1);
  let preloads = getCurrentPageModulePreloadHrefs(matches, manifest);
  return dedupe(htmlLinkDescriptors, preloads);
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page === "string";
}
function isBlockLinkDescriptor(object) {
  return object != null && object.blocker === true;
}
function getPageLinkDescriptors(descriptor, location, matches, manifest, clientRoutes) {
  let [pathname, search = ""] = descriptor.page.split("?");
  let nextMatches = matchClientRoutes(clientRoutes, pathname);
  if (!nextMatches) {
    console.warn(`No routes match ${descriptor.page}, ignoring page prefetch.`);
    return [];
  }
  let links2 = [getPageScripts(descriptor, nextMatches, manifest)];
  if (descriptor.data === true) {
    let newMatches = location.search !== search ? nextMatches : nextMatches.filter((match, index) => !matches[index] || matches[index].pathname !== match.pathname || matches[index].params["*"] !== match.params["*"]);
    links2 = links2.concat(getDataLinks(descriptor, newMatches, manifest));
  }
  return links2.flat(1);
}
function getDataLinks(descriptor, matches, manifestPatch) {
  let _a = descriptor, {
    page,
    data
  } = _a, rest = __objRest(_a, [
    "page",
    "data"
  ]);
  return matches.filter((match) => manifestPatch.routes[match.route.id].hasLoader).map((match) => {
    let [pathname, search] = descriptor.page.split("?");
    let searchParams = new URLSearchParams(search);
    searchParams.append("_data", match.route.id);
    let href = `${pathname}?${searchParams}`;
    return __objSpread({
      rel: "prefetch",
      as: "fetch",
      href
    }, rest);
  });
}
function getCurrentPageModulePreloadHrefs(matches, manifest) {
  return matches.map((match) => {
    let route = manifest.routes[match.route.id];
    let hrefs = [route.module];
    if (route.imports) {
      hrefs = hrefs.concat(route.imports);
    }
    return hrefs;
  }).flat(1);
}
function getPageScripts(descriptor, matches, manifestPatch) {
  let _a = descriptor, {
    page,
    data
  } = _a, rest = __objRest(_a, [
    "page",
    "data"
  ]);
  return matches.map((match) => {
    let route = manifestPatch.routes[match.route.id];
    let hrefs = [route.module];
    if (route.imports) {
      hrefs = hrefs.concat(route.imports);
    }
    return hrefs.map((href) => __objSpread({
      href,
      rel: "prefetch",
      as: "script"
    }, rest));
  }).flat(1);
}
function dedupe(descriptors, preloads) {
  let set = new Set();
  let preloadsSet = new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    let alreadyModulePreload = descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href);
    if (alreadyModulePreload) {
      return deduped;
    }
    let str = JSON.stringify(descriptor);
    if (!set.has(str)) {
      set.add(str);
      deduped.push(descriptor);
    }
    return deduped;
  }, []);
}

// node_modules/@remix-run/react/components.js
var FormState;
(function(FormState2) {
  FormState2["Idle"] = "idle";
  FormState2["Pending"] = "pending";
  FormState2["Redirected"] = "redirected";
  FormState2["PendingGet"] = "pendingGet";
})(FormState || (FormState = {}));
var pendingFormSubmit = void 0;
var formState = FormState.Idle;
function setFormRedirected() {
  formState = FormState.Redirected;
}
function setFormIdle() {
  pendingFormSubmit = void 0;
  formState = FormState.Idle;
}
var RemixEntryContext = /* @__PURE__ */ import_react3.default.createContext(void 0);
function useRemixEntryContext() {
  let context = import_react3.default.useContext(RemixEntryContext);
  invariant_default(context, "You must render this element inside a <Remix> element");
  return context;
}
function RemixEntry({
  context: entryContext,
  action: nextAction,
  location: nextLocation,
  navigator,
  static: staticProp = false
}) {
  let {
    manifest,
    matches: entryMatches,
    routeData: entryRouteData,
    routeModules,
    serverHandoffString,
    componentDidCatchEmulator: entryComponentDidCatchEmulator
  } = entryContext;
  let [state, setState] = import_react3.default.useState({
    action: nextAction,
    location: nextLocation,
    matches: createClientMatches(entryMatches, RemixRoute),
    routeData: entryRouteData,
    componentDidCatchEmulator: entryComponentDidCatchEmulator
  });
  let {
    action,
    location,
    matches,
    routeData,
    componentDidCatchEmulator
  } = state;
  let clientRoutes = import_react3.default.useMemo(() => createClientRoutes(manifest.routes, RemixRoute), [manifest]);
  let links2 = import_react3.default.useMemo(() => {
    return getLinks(location, matches, routeData, routeModules, manifest, clientRoutes);
  }, [location, matches, routeData, routeModules, manifest, clientRoutes]);
  import_react3.default.useEffect(() => {
    if (location === nextLocation)
      return;
    let isCurrent = true;
    (async () => {
      let nextMatches = matchClientRoutes(clientRoutes, nextLocation);
      let didRedirect = false;
      function handleDataRedirect(response) {
        let url = new URL(response.headers.get("X-Remix-Redirect"), window.location.origin);
        didRedirect = true;
        if (formState === FormState.Pending) {
          setFormRedirected();
        }
        if (url.origin !== window.location.origin) {
          window.location.replace(url.href);
        } else {
          navigator.replace(url.pathname + url.search);
        }
      }
      if (formState === FormState.Pending) {
        let leafMatch = nextMatches[nextMatches.length - 1];
        let leafRoute = manifest.routes[leafMatch.route.id];
        if (!leafRoute.hasAction) {
          throw new Error(`Route "${leafRoute.id}" does not have an action handler, but you are trying to submit to it. To fix this, please add an \`action\` function to the route module.`);
        }
        let response = await fetchData(nextLocation, leafRoute.id, pendingFormSubmit);
        handleDataRedirect(response);
        return;
      }
      function maybeHandleDataRedirect(response) {
        if (!didRedirect)
          handleDataRedirect(response);
      }
      let newMatches = formState === FormState.Redirected || location.search !== nextLocation.search ? nextMatches : nextMatches.filter((match, index) => !matches[index] || matches[index].pathname !== match.pathname || matches[index].params["*"] !== match.params["*"]);
      let transitionResults = await Promise.all(newMatches.map(async (match) => {
        let routeId = match.route.id;
        let route = manifest.routes[routeId];
        let [dataResult, routeModule] = await Promise.all([route.hasLoader ? fetchData(nextLocation, route.id) : void 0, loadRouteModule(route, routeModules)]);
        if (isRedirectResponse(dataResult) || dataResult instanceof Error || routeModule == null) {
          return {
            routeId,
            dataResult,
            links: []
          };
        }
        if (routeModule.links) {
          await preloadBlockingLinks(routeModule, dataResult != null ? await extractData(dataResult.clone()) : null);
        }
        return {
          routeId,
          dataResult
        };
      }));
      let componentDidCatchEmulator2 = {
        trackBoundaries: false,
        renderBoundaryRouteId: null,
        loaderBoundaryRouteId: null,
        error: void 0
      };
      for (let {
        routeId,
        dataResult
      } of transitionResults) {
        if (!(dataResult instanceof Response || dataResult instanceof Error) || componentDidCatchEmulator2.error) {
          continue;
        }
        let routeModule = routeModules[routeId];
        if (routeModule.ErrorBoundary) {
          componentDidCatchEmulator2.loaderBoundaryRouteId = routeId;
        }
        if (dataResult instanceof Error) {
          componentDidCatchEmulator2.error = dataResult;
        } else if (isRedirectResponse(dataResult)) {
          maybeHandleDataRedirect(dataResult);
        }
      }
      let newRouteData = (await Promise.all(transitionResults.map(async ({
        routeId,
        dataResult
      }) => {
        if (dataResult instanceof Response || dataResult instanceof Error) {
          return [routeId, await extractData(dataResult)];
        }
        return [routeId, void 0];
      }))).reduce((memo, [routeId, data]) => {
        if (data)
          memo[routeId] = data;
        return memo;
      }, {});
      let nextRouteData = nextMatches.reduce((memo, match) => {
        let routeId = match.route.id;
        memo[routeId] = newRouteData[routeId] || routeData[routeId];
        return memo;
      }, {});
      if (isCurrent && !didRedirect) {
        if (formState === FormState.Redirected || formState === FormState.PendingGet) {
          setFormIdle();
        }
        setState({
          action: nextAction,
          location: nextLocation,
          matches: nextMatches,
          routeData: nextRouteData,
          componentDidCatchEmulator: componentDidCatchEmulator2
        });
      }
    })();
    return () => {
      isCurrent = false;
    };
  }, [nextAction, nextLocation, location, matches, routeData, navigator, manifest, routeModules, clientRoutes]);
  let context = {
    manifest,
    matches,
    componentDidCatchEmulator,
    routeData,
    routeModules,
    serverHandoffString,
    pendingLocation: nextLocation !== location ? nextLocation : void 0,
    clientRoutes,
    links: links2
  };
  let maybeServerRenderError = componentDidCatchEmulator.error && componentDidCatchEmulator.renderBoundaryRouteId === null && componentDidCatchEmulator.loaderBoundaryRouteId === null ? deserializeError(componentDidCatchEmulator.error) : void 0;
  return /* @__PURE__ */ import_react3.default.createElement(RemixEntryContext.Provider, {
    value: context
  }, /* @__PURE__ */ import_react3.default.createElement(RemixErrorBoundary, {
    location,
    component: RemixRootDefaultErrorBoundary,
    error: maybeServerRenderError
  }, /* @__PURE__ */ import_react3.default.createElement(import_react_router_dom2.Router, {
    action,
    location,
    navigator,
    static: staticProp
  }, /* @__PURE__ */ import_react3.default.createElement(Routes, null))));
}
function deserializeError(data) {
  let error = new Error(data.message);
  error.stack = data.stack;
  return error;
}
var RemixRouteContext = /* @__PURE__ */ import_react3.default.createContext(void 0);
function DefaultRouteComponent({
  id
}) {
  throw new Error(`Route "${id}" has no component! Please go add a \`default\` export in the route module file.`);
}
function RemixRoute({
  id
}) {
  let location = (0, import_react_router_dom2.useLocation)();
  let {
    routeData,
    routeModules,
    componentDidCatchEmulator
  } = useRemixEntryContext();
  let data = routeData[id];
  let {
    default: Component,
    ErrorBoundary: ErrorBoundary2
  } = routeModules[id];
  let children = Component ? /* @__PURE__ */ import_react3.default.createElement(Component, null) : /* @__PURE__ */ import_react3.default.createElement(DefaultRouteComponent, {
    id
  });
  let element = /* @__PURE__ */ import_react3.default.createElement(RemixRouteContext.Provider, {
    value: {
      data,
      id
    },
    children
  });
  if (!ErrorBoundary2)
    return element;
  let maybeServerRenderError = componentDidCatchEmulator.error && (componentDidCatchEmulator.renderBoundaryRouteId === id || componentDidCatchEmulator.loaderBoundaryRouteId === id) ? deserializeError(componentDidCatchEmulator.error) : void 0;
  if (componentDidCatchEmulator.trackBoundaries) {
    componentDidCatchEmulator.renderBoundaryRouteId = id;
  }
  return /* @__PURE__ */ import_react3.default.createElement(RemixErrorBoundary, {
    location,
    component: ErrorBoundary2,
    error: maybeServerRenderError
  }, element);
}
function Links() {
  let {
    links: links2
  } = useRemixEntryContext();
  return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, links2.map((link) => /* @__PURE__ */ import_react3.default.createElement("link", _extends({
    key: link.rel + link.href
  }, link))));
}
function Meta() {
  let {
    matches,
    routeData,
    routeModules
  } = useRemixEntryContext();
  let location = (0, import_react_router_dom2.useLocation)();
  let meta3 = {};
  let parentsData = {};
  for (let match of matches) {
    let routeId = match.route.id;
    let data = routeData[routeId];
    let params = match.params;
    let routeModule = routeModules[routeId];
    if (typeof routeModule.meta === "function") {
      let routeMeta = routeModule.meta({
        data,
        parentsData,
        params,
        location
      });
      Object.assign(meta3, routeMeta);
    }
    parentsData[routeId] = data;
  }
  return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, Object.keys(meta3).map((name) => name === "title" ? /* @__PURE__ */ import_react3.default.createElement("title", {
    key: "title"
  }, meta3[name]) : name.startsWith("og:") ? /* @__PURE__ */ import_react3.default.createElement("meta", {
    key: name,
    property: name,
    content: meta3[name]
  }) : /* @__PURE__ */ import_react3.default.createElement("meta", {
    key: name,
    name,
    content: meta3[name]
  })));
}
function Scripts() {
  let {
    manifest,
    matches,
    pendingLocation,
    clientRoutes,
    serverHandoffString
  } = useRemixEntryContext();
  let initialScripts = import_react3.default.useMemo(() => {
    let contextScript = serverHandoffString ? `window.__remixContext = ${serverHandoffString};` : "";
    let routeModulesScript = `${matches.map((match, index) => `import * as route${index} from ${JSON.stringify(manifest.routes[match.route.id].module)};`).join("\n")}
    window.__remixRouteModules = {${matches.map((match, index) => `${JSON.stringify(match.route.id)}:route${index}`).join(",")}};`;
    return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, /* @__PURE__ */ import_react3.default.createElement("script", {
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: createHtml(contextScript)
    }), /* @__PURE__ */ import_react3.default.createElement("script", {
      dangerouslySetInnerHTML: createHtml(routeModulesScript),
      type: "module"
    }), /* @__PURE__ */ import_react3.default.createElement("script", {
      src: manifest.url,
      type: "module"
    }), /* @__PURE__ */ import_react3.default.createElement("script", {
      src: manifest.entry.module,
      type: "module"
    }));
  }, []);
  let nextMatches = import_react3.default.useMemo(() => pendingLocation ? matchClientRoutes(clientRoutes, pendingLocation) : [], [pendingLocation, clientRoutes]);
  let routePreloads = matches.concat(nextMatches).map((match) => {
    let route = manifest.routes[match.route.id];
    return (route.imports || []).concat([route.module]);
  }).flat(1);
  let preloads = manifest.entry.imports.concat(routePreloads);
  return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, dedupe2(preloads).map((path) => /* @__PURE__ */ import_react3.default.createElement("link", {
    key: path,
    rel: "modulepreload",
    href: path
  })), initialScripts);
}
function dedupe2(array) {
  return [...new Set(array)];
}
function Routes() {
  let {
    clientRoutes
  } = useRemixEntryContext();
  let element = (0, import_react_router_dom2.useRoutes)(clientRoutes);
  return element;
}
function useLiveReload() {
  import_react3.default.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      let ws = new WebSocket("ws://localhost:3001/socket");
      ws.onmessage = (message) => {
        let event = JSON.parse(message.data);
        if (event.type === "LOG") {
          console.log(event.message);
        }
        if (event.type === "RELOAD") {
          console.log("\u{1F4BF} Reloading window ...");
          window.location.reload();
        }
      };
      ws.onerror = (error) => {
        console.log("Remix dev asset server web socket error:");
        console.error(error);
      };
    }
  }, []);
}

// node_modules/@remix-run/react/server.js
var import_history2 = __toModule(require("history"));
var import_react5 = __toModule(require("react"));
function RemixServer({
  context,
  url
}) {
  if (typeof url === "string") {
    url = new URL(url);
  }
  let location = {
    pathname: url.pathname,
    search: url.search,
    hash: "",
    state: null,
    key: "default"
  };
  let staticNavigator = {
    createHref(to) {
      return typeof to === "string" ? to : (0, import_history2.createPath)(to);
    },
    push(to) {
      throw new Error(`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`);
    },
    replace(to) {
      throw new Error(`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`);
    },
    go(delta) {
      throw new Error(`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`);
    },
    back() {
      throw new Error(`You cannot use navigator.back() on the server because it is a stateless environment.`);
    },
    forward() {
      throw new Error(`You cannot use navigator.forward() on the server because it is a stateless environment.`);
    },
    block() {
      throw new Error(`You cannot use navigator.block() on the server because it is a stateless environment.`);
    }
  };
  return /* @__PURE__ */ import_react5.default.createElement(RemixEntry, {
    context,
    action: import_history2.Action.Pop,
    location,
    navigator: staticNavigator,
    static: true
  });
}

// node_modules/@remix-run/react/index.js
var import_react_router_dom4 = __toModule(require("react-router-dom"));

// app/entry.server.tsx
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = import_server2.default.renderToString(/* @__PURE__ */ React.createElement(RemixServer, {
    context: remixContext,
    url: request.url
  }));
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: __objSpread(__objSpread({}, Object.fromEntries(responseHeaders)), {
      "Content-Type": "text/html"
    })
  });
}

// route-module:/home/gabriel/code/fungirealti.me/app/root.tsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links
});
var import_react_router_dom5 = __toModule(require("react-router-dom"));

// app/styles/app.css
var app_default = "/build/_assets/app-3YG2MM46.css";

// route-module:/home/gabriel/code/fungirealti.me/app/root.tsx
var links = () => {
  return [{rel: "stylesheet", href: app_default}];
};
function App() {
  useLiveReload();
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("link", {
    rel: "icon",
    href: "/favicon.png",
    type: "image/png"
  }), /* @__PURE__ */ React.createElement(Meta, null), /* @__PURE__ */ React.createElement(Links, null)), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement(import_react_router_dom5.Outlet, null), /* @__PURE__ */ React.createElement(Scripts, null)));
}
function ErrorBoundary({error}) {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("link", {
    rel: "icon",
    href: "/favicon.png",
    type: "image/png"
  }), /* @__PURE__ */ React.createElement("title", null, "Oops!")), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "App Error"), /* @__PURE__ */ React.createElement("pre", null, error.message)), /* @__PURE__ */ React.createElement(Scripts, null)));
}

// route-module:/home/gabriel/code/fungirealti.me/app/routes/404.tsx
var __exports = {};
__export(__exports, {
  default: () => FourOhFour,
  meta: () => meta
});
var meta = () => {
  return {title: "Ain't nothing here"};
};
function FourOhFour() {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "404"));
}

// route-module:/home/gabriel/code/fungirealti.me/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  loader: () => loader,
  meta: () => meta2
});
var import_node2 = __toModule(require("@remix-run/node"));
var import_react8 = __toModule(require("react"));
var import_react9 = __toModule(require("@headlessui/react"));
var import_outline = __toModule(require("@heroicons/react/outline"));
var import_solid = __toModule(require("@heroicons/react/solid"));

// app/sessions.ts
var import_config = __toModule(require("dotenv/config"));
var import_node = __toModule(require("@remix-run/node"));
var {getSession, commitSession, destroySession} = (0, import_node.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    secrets: [process.env.SESSION_SECRET_1],
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1209600
  }
});

// route-module:/home/gabriel/code/fungirealti.me/app/routes/index.tsx
var meta2 = () => {
  return {
    title: "Fungi | Powering realtime experiences",
    description: "Fungi empowers developers to add realtime features to their apps with easy to use and scalable APIs."
  };
};
var loader = async ({request}) => {
  let session = await getSession(request.headers.get("Cookie"));
  if (session.has("userId")) {
    return (0, import_node2.redirect)("/dashboard");
  }
  return (0, import_node2.json)(null, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};
var navigation = [
  {name: "Product", href: "/product"},
  {name: "Docs", href: "/docs"},
  {name: "Tutorials", href: "/tutorials"},
  {name: "Pricing", href: "/pricing"}
];
function Index() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "min-h-screen"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative overflow-hidden"
  }, /* @__PURE__ */ React.createElement(import_react9.Popover, {
    as: "header",
    className: "relative"
  }, ({open}) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "bg-gray-900 pt-6"
  }, /* @__PURE__ */ React.createElement("nav", {
    className: "relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6",
    "aria-label": "Global"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center flex-1"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center justify-between w-full md:w-auto"
  }, /* @__PURE__ */ React.createElement("a", {
    href: "#"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "sr-only"
  }, "Fungi"), /* @__PURE__ */ React.createElement("img", {
    className: "h-8 w-auto sm:h-10",
    src: "/logo_transparent.png",
    alt: "Fungi logo"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "-mr-2 flex items-center md:hidden"
  }, /* @__PURE__ */ React.createElement(import_react9.Popover.Button, {
    className: "bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "sr-only"
  }, "Open main menu"), /* @__PURE__ */ React.createElement(import_outline.MenuIcon, {
    className: "h-6 w-6",
    "aria-hidden": "true"
  })))), /* @__PURE__ */ React.createElement("div", {
    className: "hidden space-x-8 md:flex md:ml-10"
  }, navigation.map((item) => /* @__PURE__ */ React.createElement("a", {
    key: item.name,
    href: item.href,
    className: "text-base font-medium text-white hover:text-gray-300"
  }, item.name)))), /* @__PURE__ */ React.createElement("div", {
    className: "hidden md:flex md:items-center md:space-x-6"
  }, /* @__PURE__ */ React.createElement("a", {
    href: "#",
    className: "text-base font-medium text-white hover:text-gray-300"
  }, "Log in"), /* @__PURE__ */ React.createElement("a", {
    href: "#",
    className: "inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
  }, "Start free trial")))), /* @__PURE__ */ React.createElement(import_react9.Transition, {
    show: open,
    as: import_react8.Fragment,
    enter: "duration-150 ease-out",
    enterFrom: "opacity-0 scale-95",
    enterTo: "opacity-100 scale-100",
    leave: "duration-100 ease-in",
    leaveFrom: "opacity-100 scale-100",
    leaveTo: "opacity-0 scale-95"
  }, /* @__PURE__ */ React.createElement(import_react9.Popover.Panel, {
    focus: true,
    static: true,
    className: "absolute top-0 inset-x-0 p-2 transition transform origin-top md:hidden"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "px-5 pt-4 flex items-center justify-between"
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("img", {
    className: "h-8 w-auto",
    src: "/logo_transparent.png",
    alt: ""
  })), /* @__PURE__ */ React.createElement("div", {
    className: "-mr-2"
  }, /* @__PURE__ */ React.createElement(import_react9.Popover.Button, {
    className: "bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "sr-only"
  }, "Close menu"), /* @__PURE__ */ React.createElement(import_outline.XIcon, {
    className: "h-6 w-6",
    "aria-hidden": "true"
  })))), /* @__PURE__ */ React.createElement("div", {
    className: "pt-5 pb-6"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "px-2 space-y-1"
  }, navigation.map((item) => /* @__PURE__ */ React.createElement("a", {
    key: item.name,
    href: item.href,
    className: "block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
  }, item.name))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-6 px-5"
  }, /* @__PURE__ */ React.createElement("a", {
    href: "#",
    className: "block text-center w-full py-3 px-4 rounded-md shadow bg-brand text-white font-medium hover:bg-red-500"
  }, "Start free trial")), /* @__PURE__ */ React.createElement("div", {
    className: "mt-6 px-5"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "text-center text-base font-medium text-gray-500"
  }, "Existing customer?", " ", /* @__PURE__ */ React.createElement("a", {
    href: "#",
    className: "text-gray-900 hover:underline"
  }, "Login"))))))))), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("div", {
    className: "pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mx-auto max-w-7xl lg:px-8"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "lg:grid lg:grid-cols-2 lg:gap-20"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "lg:py-24"
  }, /* @__PURE__ */ React.createElement("a", {
    href: "/pricing",
    className: "inline-flex items-center text-white bg-black rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-brand rounded-full"
  }, "On sale"), /* @__PURE__ */ React.createElement("span", {
    className: "ml-4 text-sm"
  }, "Visit our pricing page"), /* @__PURE__ */ React.createElement(import_solid.ChevronRightIcon, {
    className: "ml-2 w-5 h-5 text-gray-500",
    "aria-hidden": "true"
  })), /* @__PURE__ */ React.createElement("h1", {
    className: "mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "block"
  }, "A better way to"), /* @__PURE__ */ React.createElement("span", {
    className: "block text-brand"
  }, "build realtime apps")), /* @__PURE__ */ React.createElement("p", {
    className: "mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
  }, "Robust, scalable and easy to use realtime APIs. We take care of all the complexity so you can focus on building your app."), /* @__PURE__ */ React.createElement("div", {
    className: "mt-10 sm:mt-12"
  }, /* @__PURE__ */ React.createElement("form", {
    action: "#",
    className: "sm:max-w-xl sm:mx-auto lg:mx-0"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "sm:flex"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: "email",
    className: "sr-only"
  }, "Email address"), /* @__PURE__ */ React.createElement("input", {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    className: "block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 focus:ring-offset-gray-900"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "mt-3 sm:mt-0 sm:ml-3"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    className: "block w-full py-3 px-4 rounded-md shadow bg-brand text-white font-medium hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 focus:ring-offset-gray-900"
  }, "Start free trial"))), /* @__PURE__ */ React.createElement("p", {
    className: "mt-3 text-sm text-gray-300 sm:mt-4"
  }, "Start your free 14-day trial. By providing your email, you agree to our", " ", /* @__PURE__ */ React.createElement("a", {
    href: "#",
    className: "font-medium text-white"
  }, "terms of service"), "."))))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-12 -mb-16 lg:mb-0 lg:mt-12 lg:relative flex items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0"
  }, /* @__PURE__ */ React.createElement("img", {
    className: "w-full lg:max-w-none",
    src: "/hero.svg",
    alt: ""
  })))))))));
}

// <stdin>
var import_assets = __toModule(require("./assets.json"));
var entry = {module: entry_server_exports};
var routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "/",
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/404": {
    id: "routes/404",
    parentId: "root",
    path: "*",
    caseSensitive: false,
    module: __exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: "/",
    caseSensitive: false,
    module: routes_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
