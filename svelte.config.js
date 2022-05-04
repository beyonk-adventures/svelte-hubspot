/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    package: {
      emitTypes: false,
      exports: (file) => file === 'index.js'
    }
  }
}

export default config
