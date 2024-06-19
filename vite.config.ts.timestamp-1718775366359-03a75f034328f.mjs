// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/vue/Learning-Geeker-Admin/node_modules/.pnpm/vite@5.2.12_@types+node@20.14.2_terser@5.31.1/node_modules/vite/dist/node/index.js";
import { resolve as resolve2 } from "path";

// build/getEnv.ts
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT")
      realName = Number(realName);
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
      }
    }
    ret[envName] = realName;
  }
  return ret;
}

// build/proxy.ts
function createProxy(list = []) {
  const ret = {};
  for (const [prefix, target] of list) {
    const httpsRE = /^https:\/\//;
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
      ...isHttps ? { success: false } : {}
    };
  }
  return ret;
}

// build/plugins.ts
import vue from "file:///D:/vue/Learning-Geeker-Admin/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.2.12_@types+node@20.14.2_terser@5.31.1__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/vue/Learning-Geeker-Admin/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.0_vite@5.2.12_@types+node@20.14.2_terser@5.31.1__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import eslintPlugin from "file:///D:/vue/Learning-Geeker-Admin/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@9.4.0_vite@5.2.12_@types+node@20.14.2_terser@5.31.1_/node_modules/vite-plugin-eslint/dist/index.mjs";
import { createHtmlPlugin } from "file:///D:/vue/Learning-Geeker-Admin/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.2.12_@types+node@20.14.2_terser@5.31.1_/node_modules/vite-plugin-html/dist/index.mjs";
import { VitePWA } from "file:///D:/vue/Learning-Geeker-Admin/node_modules/.pnpm/vite-plugin-pwa@0.20.0_vite@5.2.12_@types+node@20.14.2_terser@5.31.1__workbox-build@7.1.1_workbox-window@7.1.0/node_modules/vite-plugin-pwa/dist/index.js";
import viteCompression from "file:///D:/vue/Learning-Geeker-Admin/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.2.12_@types+node@20.14.2_terser@5.31.1_/node_modules/vite-plugin-compression/dist/index.mjs";
import vueSetupExtend from "file:///D:/vue/Learning-Geeker-Admin/node_modules/.pnpm/unplugin-vue-setup-extend-plus@1.0.1/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js";
import { createSvgIconsPlugin } from "file:///D:/vue/Learning-Geeker-Admin/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.2.12_@types+node@20.14.2_terser@5.31.1_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { visualizer } from "file:///D:/vue/Learning-Geeker-Admin/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@2.79.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { resolve } from "path";
var createVitePlugins = (viteEnv) => {
  const { VITE_GLOB_APP_TITLE, VITE_REPORT, VITE_PWA } = viteEnv;
  return [
    vue(),
    vueJsx(),
    eslintPlugin(),
    vueSetupExtend({}),
    createCompression(viteEnv),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: { title: VITE_GLOB_APP_TITLE }
      }
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    }),
    VITE_PWA && createVitePwa(viteEnv),
    VITE_REPORT && visualizer({ filename: "stats.html", gzipSize: true, brotliSize: true })
  ];
};
var createCompression = (viteEnv) => {
  const { VITE_BUILD_COMPRESS = "none", VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
  const compressList = VITE_BUILD_COMPRESS.split(",");
  const plugins = [];
  if (compressList.includes("gzip")) {
    plugins.push(viteCompression({
      ext: ".gz",
      algorithm: "gzip",
      deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
    }));
  }
  if (compressList.includes("brotli")) {
    plugins.push(viteCompression({
      ext: ".br",
      algorithm: "brotliCompress",
      deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
    }));
  }
  return plugins;
};
var createVitePwa = (viteEnv) => {
  const { VITE_GLOB_APP_TITLE } = viteEnv;
  return VitePWA({
    registerType: "autoUpdate",
    manifest: {
      name: VITE_GLOB_APP_TITLE,
      short_name: VITE_GLOB_APP_TITLE,
      theme_color: "#ffffff",
      icons: [
        {
          src: "/logo.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }
      ]
    }
  });
};

// package.json
var package_default = {
  name: "learning-geeker-admin",
  private: true,
  version: "0.0.0",
  type: "module",
  scripts: {
    dev: "vite",
    server: "vite",
    "build:dev": "vue-tsc && vite build --mode development",
    "build:test": "vue-tsc && vite build --mode test",
    "build:pro": "vue-tsc && vite build --mode production",
    "type:check": "vue-tsc --noEmit --skipLibCheck",
    build: "vue-tsc && vite build",
    preview: "npm run build:dev && vite preview",
    "lint:eslint": "eslint ./src --fix",
    "lint:prettier": 'prettier --write "src/**/*.{js,ts,json,tsx,css,less,scss,vue,html,md}"',
    "lint:stylelint": 'stylelint --cache --fix "**/*.{vue,less,postcss,css,scss}" --cache --cache-location node_modules/.cache/stylelint/',
    "lint:lint-staged": "lint-staged",
    prepare: "husky install",
    commit: "git add -A && cz"
  },
  config: {
    commitizen: {
      path: "node_modules/cz-git",
      useEmoji: true
    }
  },
  dependencies: {
    "@typescript-eslint/parser": "^7.12.0",
    "@vitejs/plugin-vue-jsx": "^4.0.0",
    autoprefixer: "^10.4.19",
    "cz-git": "^1.9.2",
    dayjs: "^1.11.11",
    fs: "0.0.1-security",
    postcss: "^8.4.38",
    punycode: "^2.3.1",
    "rollup-plugin-visualizer": "^5.12.0",
    "unplugin-vue-setup-extend-plus": "^1.0.1",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-eslint": "^1.8.1",
    "vite-plugin-html": "^3.2.2",
    "vite-plugin-pwa": "^0.20.0",
    "vite-plugin-svg-icons": "^2.0.1",
    vue: "^3.4.21",
    "vue-eslint-parser": "^9.4.3",
    "vue-i18n": "^9.13.1"
  },
  devDependencies: {
    "@commitlint/cli": "^19.3.0",
    "@commitlint/config-conventional": "^19.2.2",
    "@eslint/js": "^9.4.0",
    "@types/eslint__js": "^8.42.3",
    "@typescript-eslint/eslint-plugin": "^7.12.0",
    "@vitejs/plugin-vue": "^5.0.5",
    commitizen: "^4.3.0",
    eslint: "~9.4.0",
    "eslint-plugin-vue": "^9.26.0",
    globals: "^15.3.0",
    husky: "^9.0.11",
    "lint-staged": "^15.2.5",
    "postcss-html": "^1.7.0",
    prettier: "3.3.1",
    stylelint: "^16.6.1",
    "stylelint-config-prettier": "^9.0.5",
    "stylelint-config-recess-order": "^5.0.1",
    "stylelint-config-recommended-vue": "^1.5.0",
    "stylelint-config-standard": "^36.0.0",
    "stylelint-config-standard-scss": "^13.1.0",
    typescript: "^5.4.5",
    "typescript-eslint": "^7.12.0",
    vite: "^5.2.0",
    "vue-tsc": "^2.0.6"
  },
  "lint-staged": {
    "src/**/*.{js,jsx,vue,ts,tsx}": [
      "eslint ./src --fix",
      "prettier --write"
    ],
    "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": [
      "prettier --write--parser json"
    ],
    "package.json": [
      "prettier --write"
    ],
    "*.vue": [
      "eslint --fix",
      "prettier --write",
      "stylelint --fix"
    ],
    "*.{scss,less,styl,html}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.md": [
      "prettier --write"
    ]
  }
};

// vite.config.ts
import dayjs from "file:///D:/vue/Learning-Geeker-Admin/node_modules/.pnpm/dayjs@1.11.11/node_modules/dayjs/dayjs.min.js";
var __vite_injected_original_dirname = "D:\\vue\\Learning-Geeker-Admin";
var { dependencies, devDependencies, name, version } = package_default;
var __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};
var vite_config_default = defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "@": resolve2(__vite_injected_original_dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      proxy: createProxy(viteEnv.VITE_PROXY)
    },
    plugins: [createVitePlugins(viteEnv)],
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    build: {
      outDir: "dist",
      minify: "esbuild",
      sourcemap: false,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2e3,
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvZ2V0RW52LnRzIiwgImJ1aWxkL3Byb3h5LnRzIiwgImJ1aWxkL3BsdWdpbnMudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcdnVlXFxcXExlYXJuaW5nLUdlZWtlci1BZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdnVlXFxcXExlYXJuaW5nLUdlZWtlci1BZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovdnVlL0xlYXJuaW5nLUdlZWtlci1BZG1pbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZywgQ29uZmlnRW52LCBVc2VyQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHt3cmFwcGVyRW52fSBmcm9tICcuL2J1aWxkL2dldEVudic7XG5pbXBvcnQge2NyZWF0ZVByb3h5fSBmcm9tIFwiLi9idWlsZC9wcm94eVwiO1xuaW1wb3J0IHsgY3JlYXRlVml0ZVBsdWdpbnMgfSBmcm9tIFwiLi9idWlsZC9wbHVnaW5zXCI7XG5pbXBvcnQgcGtnIGZyb20gXCIuL3BhY2thZ2UuanNvblwiO1xuaW1wb3J0IGRheWpzIGZyb20gXCJkYXlqc1wiO1xuXG5jb25zdCB7ZGVwZW5kZW5jaWVzLCBkZXZEZXBlbmRlbmNpZXMsIG5hbWUsIHZlcnNpb259ID0gcGtnO1xuY29uc3QgX19BUFBfSU5GT19fID0ge1xuICBwa2c6IHtkZXBlbmRlbmNpZXMsIGRldkRlcGVuZGVuY2llcywgbmFtZSwgdmVyc2lvbn0sXG4gIGxhc3RCdWlsZFRpbWU6IGRheWpzKCkuZm9ybWF0KFwiWVlZWS1NTS1ERCBISDptbTpzc1wiKVxufVxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PiB7XG4gIGNvbnN0IHJvb3QgPSBwcm9jZXNzLmN3ZCgpO1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHJvb3QpO1xuICBjb25zdCB2aXRlRW52ID0gd3JhcHBlckVudihlbnYpO1xuICByZXR1cm4ge1xuICAgIGJhc2U6dml0ZUVudi5WSVRFX1BVQkxJQ19QQVRILFxuICAgIHJvb3QsXG4gICAgcmVzb2x2ZTp7XG4gICAgICBhbGlhczp7XG4gICAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICAgICAgXCJ2dWUtaTE4blwiOlwidnVlLWkxOG4vZGlzdC92dWUtaTE4bi5janMuanNcIlxuICAgICAgfVxuICAgIH0sXG4gICAgZGVmaW5lOiB7XG4gICAgICBfX0FQUF9JTkZPX186IEpTT04uc3RyaW5naWZ5KF9fQVBQX0lORk9fXyksXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgc2Nzczoge1xuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIkAvc3R5bGVzL3Zhci5zY3NzXCI7YFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxuICAgICAgcG9ydDogdml0ZUVudi5WSVRFX1BPUlQsXG4gICAgICBvcGVuOiB2aXRlRW52LlZJVEVfT1BFTixcbiAgICAgIGNvcnM6IHRydWUsXG4gICAgICBwcm94eTogY3JlYXRlUHJveHkodml0ZUVudi5WSVRFX1BST1hZKVxuICAgIH0sXG4gICAgcGx1Z2luczogW2NyZWF0ZVZpdGVQbHVnaW5zKHZpdGVFbnYpXSxcbiAgICBlc2J1aWxkOiB7XG4gICAgICBwdXJlOiB2aXRlRW52LlZJVEVfRFJPUF9DT05TT0xFID8gW1wiY29uc29sZS5sb2dcIiwgXCJkZWJ1Z2dlclwiXSA6IFtdXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgb3V0RGlyOiBcImRpc3RcIixcbiAgICAgIG1pbmlmeTogXCJlc2J1aWxkXCIsXG4gICAgICBzb3VyY2VtYXA6ZmFsc2UsXG4gICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiBcImFzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwiYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanNcIixcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogXCJhc3NldHMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XVwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcdnVlXFxcXExlYXJuaW5nLUdlZWtlci1BZG1pblxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdnVlXFxcXExlYXJuaW5nLUdlZWtlci1BZG1pblxcXFxidWlsZFxcXFxnZXRFbnYudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Z1ZS9MZWFybmluZy1HZWVrZXItQWRtaW4vYnVpbGQvZ2V0RW52LnRzXCI7ZXhwb3J0IGZ1bmN0aW9uIHdyYXBwZXJFbnYoZW52Q29uZjogUmVjb3JkYWJsZSk6IFZpdGVFbnYge1xuICBjb25zdCByZXQ6IGFueSA9IHt9O1xuXG4gIGZvciAoY29uc3QgZW52TmFtZSBvZiBPYmplY3Qua2V5cyhlbnZDb25mKSkge1xuICAgIGxldCByZWFsTmFtZSA9IGVudkNvbmZbZW52TmFtZV0ucmVwbGFjZSgvXFxcXG4vZywgXCJcXG5cIik7XG4gICAgcmVhbE5hbWUgPSByZWFsTmFtZSA9PT0gXCJ0cnVlXCIgPyB0cnVlIDogcmVhbE5hbWUgPT09IFwiZmFsc2VcIiA/IGZhbHNlIDogcmVhbE5hbWU7XG4gICAgaWYgKGVudk5hbWUgPT09IFwiVklURV9QT1JUXCIpIHJlYWxOYW1lID0gTnVtYmVyKHJlYWxOYW1lKTtcbiAgICBpZiAoZW52TmFtZSA9PT0gXCJWSVRFX1BST1hZXCIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlYWxOYW1lID0gSlNPTi5wYXJzZShyZWFsTmFtZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge31cbiAgICB9XG4gICAgcmV0W2Vudk5hbWVdID0gcmVhbE5hbWU7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcdnVlXFxcXExlYXJuaW5nLUdlZWtlci1BZG1pblxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdnVlXFxcXExlYXJuaW5nLUdlZWtlci1BZG1pblxcXFxidWlsZFxcXFxwcm94eS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovdnVlL0xlYXJuaW5nLUdlZWtlci1BZG1pbi9idWlsZC9wcm94eS50c1wiO2ltcG9ydCB7IFByb3h5T3B0aW9ucyB9IGZyb20gXCJ2aXRlXCI7XG5cbnR5cGUgUHJveHlJdGVtID0gW3N0cmluZywgc3RyaW5nXTtcbnR5cGUgUHJveHlMaXN0ID0gUHJveHlJdGVtW107XG50eXBlIFByb3h5VGFyZ2V0TGlzdCA9IFJlY29yZDxzdHJpbmcsIFByb3h5T3B0aW9ucz47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJveHkobGlzdDogUHJveHlMaXN0ID0gW10pIHtcbiAgY29uc3QgcmV0OiBQcm94eVRhcmdldExpc3QgPSB7fTtcbiAgZm9yKGNvbnN0IFtwcmVmaXgsIHRhcmdldF0gb2YgbGlzdCkge1xuICAgIGNvbnN0IGh0dHBzUkUgPSAvXmh0dHBzOlxcL1xcLy87XG4gICAgY29uc3QgaXNIdHRwcyA9IGh0dHBzUkUudGVzdCh0YXJnZXQpO1xuICAgIHJldFtwcmVmaXhdID0ge1xuICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICB3czogdHJ1ZSxcbiAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3ByZWZpeH1gKSwgXCJcIiksXG4gICAgICAuLi4oaXNIdHRwcyA/IHtzdWNjZXNzOiBmYWxzZX0gOiB7fSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx2dWVcXFxcTGVhcm5pbmctR2Vla2VyLUFkbWluXFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx2dWVcXFxcTGVhcm5pbmctR2Vla2VyLUFkbWluXFxcXGJ1aWxkXFxcXHBsdWdpbnMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Z1ZS9MZWFybmluZy1HZWVrZXItQWRtaW4vYnVpbGQvcGx1Z2lucy50c1wiO2ltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHZ1ZUpzeCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiO1xuaW1wb3J0IGVzbGludFBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tZXNsaW50XCI7XG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLWh0bWxcIjtcbmltcG9ydCB7IFBsdWdpbk9wdGlvbiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjtcbmltcG9ydCB2dWVTZXR1cEV4dGVuZCBmcm9tIFwidW5wbHVnaW4tdnVlLXNldHVwLWV4dGVuZC1wbHVzL3ZpdGVcIjtcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLXN2Zy1pY29uc1wiO1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlVml0ZVBsdWdpbnMgPSAodml0ZUVudjogVml0ZUVudik6IChQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSlbXSA9PiB7XG4gIGNvbnN0IHsgVklURV9HTE9CX0FQUF9USVRMRSwgVklURV9SRVBPUlQsIFZJVEVfUFdBIH0gPSB2aXRlRW52O1xuICByZXR1cm4gW1xuICAgIHZ1ZSgpLFxuICAgIHZ1ZUpzeCgpLFxuICAgIGVzbGludFBsdWdpbigpLFxuICAgIHZ1ZVNldHVwRXh0ZW5kKHt9KSxcbiAgICBjcmVhdGVDb21wcmVzc2lvbih2aXRlRW52KSxcbiAgICBjcmVhdGVIdG1sUGx1Z2luKHtcbiAgICAgIG1pbmlmeTogdHJ1ZSxcbiAgICAgIGluamVjdDoge1xuICAgICAgICBkYXRhOiB7IHRpdGxlOiBWSVRFX0dMT0JfQVBQX1RJVExFIH1cbiAgICAgIH1cbiAgICB9KSxcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICBpY29uRGlyczogW3Jlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJzcmMvYXNzZXRzL2ljb25zXCIpXSxcbiAgICAgIHN5bWJvbElkOiBcImljb24tW2Rpcl0tW25hbWVdXCJcbiAgICB9KSxcbiAgICBWSVRFX1BXQSAmJiBjcmVhdGVWaXRlUHdhKHZpdGVFbnYpLFxuICAgIFZJVEVfUkVQT1JUICYmICh2aXN1YWxpemVyKHsgZmlsZW5hbWU6IFwic3RhdHMuaHRtbFwiLCBnemlwU2l6ZTogdHJ1ZSwgYnJvdGxpU2l6ZTogdHJ1ZSB9KSBhcyBQbHVnaW5PcHRpb24pXG4gIF07XG59O1xuXG5jb25zdCBjcmVhdGVDb21wcmVzc2lvbiA9ICh2aXRlRW52OiBWaXRlRW52KTogUGx1Z2luT3B0aW9uIHwgUGx1Z2luT3B0aW9uW10gPT4ge1xuICBjb25zdCB7IFZJVEVfQlVJTERfQ09NUFJFU1MgPSBcIm5vbmVcIiwgVklURV9CVUlMRF9DT01QUkVTU19ERUxFVEVfT1JJR0lOX0ZJTEUgfSA9IHZpdGVFbnY7XG4gIGNvbnN0IGNvbXByZXNzTGlzdCA9IFZJVEVfQlVJTERfQ09NUFJFU1Muc3BsaXQoXCIsXCIpO1xuICBjb25zdCBwbHVnaW5zOiBQbHVnaW5PcHRpb25bXSA9IFtdO1xuICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKFwiZ3ppcFwiKSkge1xuICAgIHBsdWdpbnMucHVzaCh2aXRlQ29tcHJlc3Npb24oe1xuICAgICAgZXh0OiBcIi5nelwiLFxuICAgICAgYWxnb3JpdGhtOiBcImd6aXBcIixcbiAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IFZJVEVfQlVJTERfQ09NUFJFU1NfREVMRVRFX09SSUdJTl9GSUxFXG4gICAgfSkpO1xuICB9XG5cbiAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcyhcImJyb3RsaVwiKSkge1xuICAgIHBsdWdpbnMucHVzaCh2aXRlQ29tcHJlc3Npb24oe1xuICAgICAgZXh0OiBcIi5iclwiLFxuICAgICAgYWxnb3JpdGhtOiBcImJyb3RsaUNvbXByZXNzXCIsXG4gICAgICBkZWxldGVPcmlnaW5GaWxlOiBWSVRFX0JVSUxEX0NPTVBSRVNTX0RFTEVURV9PUklHSU5fRklMRVxuICAgIH0pKTtcbiAgfVxuXG4gIHJldHVybiBwbHVnaW5zO1xufTtcblxuY29uc3QgY3JlYXRlVml0ZVB3YSA9ICh2aXRlRW52OiBWaXRlRW52KTogUGx1Z2luT3B0aW9uIHwgUGx1Z2luT3B0aW9uW10gPT4ge1xuICBjb25zdCB7IFZJVEVfR0xPQl9BUFBfVElUTEUgfSA9IHZpdGVFbnY7XG4gIHJldHVybiBWaXRlUFdBKHtcbiAgICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxuICAgIG1hbmlmZXN0OiB7XG4gICAgICBuYW1lOiBWSVRFX0dMT0JfQVBQX1RJVExFLFxuICAgICAgc2hvcnRfbmFtZTogVklURV9HTE9CX0FQUF9USVRMRSxcbiAgICAgIHRoZW1lX2NvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAgIGljb25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwiL2xvZ28ucG5nXCIsXG4gICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogXCIvbG9nby5wbmdcIixcbiAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBcIi9sb2dvLnBuZ1wiLFxuICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgIHB1cnBvc2U6IFwiYW55IG1hc2thYmxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfSk7XG59O1xuIiwgIntcblx0XCJuYW1lXCI6IFwibGVhcm5pbmctZ2Vla2VyLWFkbWluXCIsXG5cdFwicHJpdmF0ZVwiOiB0cnVlLFxuXHRcInZlcnNpb25cIjogXCIwLjAuMFwiLFxuXHRcInR5cGVcIjogXCJtb2R1bGVcIixcblx0XCJzY3JpcHRzXCI6IHtcblx0XHRcImRldlwiOiBcInZpdGVcIixcblx0XHRcInNlcnZlclwiOiBcInZpdGVcIixcblx0XHRcImJ1aWxkOmRldlwiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZCAtLW1vZGUgZGV2ZWxvcG1lbnRcIixcblx0XHRcImJ1aWxkOnRlc3RcIjogXCJ2dWUtdHNjICYmIHZpdGUgYnVpbGQgLS1tb2RlIHRlc3RcIixcblx0XHRcImJ1aWxkOnByb1wiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZCAtLW1vZGUgcHJvZHVjdGlvblwiLFxuXHRcdFwidHlwZTpjaGVja1wiOiBcInZ1ZS10c2MgLS1ub0VtaXQgLS1za2lwTGliQ2hlY2tcIixcblx0XHRcImJ1aWxkXCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkXCIsXG5cdFx0XCJwcmV2aWV3XCI6IFwibnBtIHJ1biBidWlsZDpkZXYgJiYgdml0ZSBwcmV2aWV3XCIsXG5cdFx0XCJsaW50OmVzbGludFwiOiBcImVzbGludCAuL3NyYyAtLWZpeFwiLFxuXHRcdFwibGludDpwcmV0dGllclwiOiBcInByZXR0aWVyIC0td3JpdGUgXFxcInNyYy8qKi8qLntqcyx0cyxqc29uLHRzeCxjc3MsbGVzcyxzY3NzLHZ1ZSxodG1sLG1kfVxcXCJcIixcblx0XHRcImxpbnQ6c3R5bGVsaW50XCI6IFwic3R5bGVsaW50IC0tY2FjaGUgLS1maXggXFxcIioqLyoue3Z1ZSxsZXNzLHBvc3Rjc3MsY3NzLHNjc3N9XFxcIiAtLWNhY2hlIC0tY2FjaGUtbG9jYXRpb24gbm9kZV9tb2R1bGVzLy5jYWNoZS9zdHlsZWxpbnQvXCIsXG5cdFx0XCJsaW50OmxpbnQtc3RhZ2VkXCI6IFwibGludC1zdGFnZWRcIixcblx0XHRcInByZXBhcmVcIjogXCJodXNreSBpbnN0YWxsXCIsXG5cdFx0XCJjb21taXRcIjogXCJnaXQgYWRkIC1BICYmIGN6XCJcblx0fSxcblx0XCJjb25maWdcIjoge1xuXHRcdFwiY29tbWl0aXplblwiOiB7XG5cdFx0XHRcInBhdGhcIjogXCJub2RlX21vZHVsZXMvY3otZ2l0XCIsXG5cdFx0XHRcInVzZUVtb2ppXCI6IHRydWVcblx0XHR9XG5cdH0sXG5cdFwiZGVwZW5kZW5jaWVzXCI6IHtcblx0XHRcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNy4xMi4wXCIsXG5cdFx0XCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCI6IFwiXjQuMC4wXCIsXG5cdFx0XCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xOVwiLFxuXHRcdFwiY3otZ2l0XCI6IFwiXjEuOS4yXCIsXG5cdFx0XCJkYXlqc1wiOiBcIl4xLjExLjExXCIsXG5cdFx0XCJmc1wiOiBcIjAuMC4xLXNlY3VyaXR5XCIsXG5cdFx0XCJwb3N0Y3NzXCI6IFwiXjguNC4zOFwiLFxuXHRcdFwicHVueWNvZGVcIjogXCJeMi4zLjFcIixcblx0XHRcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiOiBcIl41LjEyLjBcIixcblx0XHRcInVucGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQtcGx1c1wiOiBcIl4xLjAuMVwiLFxuXHRcdFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjogXCJeMC41LjFcIixcblx0XHRcInZpdGUtcGx1Z2luLWVzbGludFwiOiBcIl4xLjguMVwiLFxuXHRcdFwidml0ZS1wbHVnaW4taHRtbFwiOiBcIl4zLjIuMlwiLFxuXHRcdFwidml0ZS1wbHVnaW4tcHdhXCI6IFwiXjAuMjAuMFwiLFxuXHRcdFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI6IFwiXjIuMC4xXCIsXG5cdFx0XCJ2dWVcIjogXCJeMy40LjIxXCIsXG5cdFx0XCJ2dWUtZXNsaW50LXBhcnNlclwiOiBcIl45LjQuM1wiLFxuXHRcdFwidnVlLWkxOG5cIjogXCJeOS4xMy4xXCJcblx0fSxcblx0XCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuXHRcdFwiQGNvbW1pdGxpbnQvY2xpXCI6IFwiXjE5LjMuMFwiLFxuXHRcdFwiQGNvbW1pdGxpbnQvY29uZmlnLWNvbnZlbnRpb25hbFwiOiBcIl4xOS4yLjJcIixcblx0XHRcIkBlc2xpbnQvanNcIjogXCJeOS40LjBcIixcblx0XHRcIkB0eXBlcy9lc2xpbnRfX2pzXCI6IFwiXjguNDIuM1wiLFxuXHRcdFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNy4xMi4wXCIsXG5cdFx0XCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNS4wLjVcIixcblx0XHRcImNvbW1pdGl6ZW5cIjogXCJeNC4zLjBcIixcblx0XHRcImVzbGludFwiOiBcIn45LjQuMFwiLFxuXHRcdFwiZXNsaW50LXBsdWdpbi12dWVcIjogXCJeOS4yNi4wXCIsXG5cdFx0XCJnbG9iYWxzXCI6IFwiXjE1LjMuMFwiLFxuXHRcdFwiaHVza3lcIjogXCJeOS4wLjExXCIsXG5cdFx0XCJsaW50LXN0YWdlZFwiOiBcIl4xNS4yLjVcIixcblx0XHRcInBvc3Rjc3MtaHRtbFwiOiBcIl4xLjcuMFwiLFxuXHRcdFwicHJldHRpZXJcIjogXCIzLjMuMVwiLFxuXHRcdFwic3R5bGVsaW50XCI6IFwiXjE2LjYuMVwiLFxuXHRcdFwic3R5bGVsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl45LjAuNVwiLFxuXHRcdFwic3R5bGVsaW50LWNvbmZpZy1yZWNlc3Mtb3JkZXJcIjogXCJeNS4wLjFcIixcblx0XHRcInN0eWxlbGludC1jb25maWctcmVjb21tZW5kZWQtdnVlXCI6IFwiXjEuNS4wXCIsXG5cdFx0XCJzdHlsZWxpbnQtY29uZmlnLXN0YW5kYXJkXCI6IFwiXjM2LjAuMFwiLFxuXHRcdFwic3R5bGVsaW50LWNvbmZpZy1zdGFuZGFyZC1zY3NzXCI6IFwiXjEzLjEuMFwiLFxuXHRcdFwidHlwZXNjcmlwdFwiOiBcIl41LjQuNVwiLFxuXHRcdFwidHlwZXNjcmlwdC1lc2xpbnRcIjogXCJeNy4xMi4wXCIsXG5cdFx0XCJ2aXRlXCI6IFwiXjUuMi4wXCIsXG5cdFx0XCJ2dWUtdHNjXCI6IFwiXjIuMC42XCJcblx0fSxcblx0XCJsaW50LXN0YWdlZFwiOiB7XG5cdFx0XCJzcmMvKiovKi57anMsanN4LHZ1ZSx0cyx0c3h9XCI6IFtcblx0XHRcdFwiZXNsaW50IC4vc3JjIC0tZml4XCIsXG5cdFx0XHRcInByZXR0aWVyIC0td3JpdGVcIlxuXHRcdF0sXG5cdFx0XCJ7IShwYWNrYWdlKSouanNvbiwqLmNvZGUtc25pcHBldHMsLiEoYnJvd3NlcnNsaXN0KSpyY31cIjogW1xuXHRcdFx0XCJwcmV0dGllciAtLXdyaXRlLS1wYXJzZXIganNvblwiXG5cdFx0XSxcblx0XHRcInBhY2thZ2UuanNvblwiOiBbXG5cdFx0XHRcInByZXR0aWVyIC0td3JpdGVcIlxuXHRcdF0sXG5cdFx0XCIqLnZ1ZVwiOiBbXG5cdFx0XHRcImVzbGludCAtLWZpeFwiLFxuXHRcdFx0XCJwcmV0dGllciAtLXdyaXRlXCIsXG5cdFx0XHRcInN0eWxlbGludCAtLWZpeFwiXG5cdFx0XSxcblx0XHRcIioue3Njc3MsbGVzcyxzdHlsLGh0bWx9XCI6IFtcblx0XHRcdFwic3R5bGVsaW50IC0tZml4XCIsXG5cdFx0XHRcInByZXR0aWVyIC0td3JpdGVcIlxuXHRcdF0sXG5cdFx0XCIqLm1kXCI6IFtcblx0XHRcdFwicHJldHRpZXIgLS13cml0ZVwiXG5cdFx0XVxuXHR9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRRLFNBQVMsY0FBcUMsZUFBZTtBQUN6VSxTQUFTLFdBQUFBLGdCQUFlOzs7QUNEcVEsU0FBUyxXQUFXLFNBQThCO0FBQzdVLFFBQU0sTUFBVyxDQUFDO0FBRWxCLGFBQVcsV0FBVyxPQUFPLEtBQUssT0FBTyxHQUFHO0FBQzFDLFFBQUksV0FBVyxRQUFRLE9BQU8sRUFBRSxRQUFRLFFBQVEsSUFBSTtBQUNwRCxlQUFXLGFBQWEsU0FBUyxPQUFPLGFBQWEsVUFBVSxRQUFRO0FBQ3ZFLFFBQUksWUFBWTtBQUFhLGlCQUFXLE9BQU8sUUFBUTtBQUN2RCxRQUFJLFlBQVksY0FBYztBQUM1QixVQUFJO0FBQ0YsbUJBQVcs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
