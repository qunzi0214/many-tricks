const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || [])
    .reduce((a, v) => ({
      ...a,
      [v.slice(0, v.indexOf('='))]: v.slice(v.indexOf('=') + 1),
    }), {})

getURLParameters('http://url.com/page?name=Adam&surname=Smith') // {name: 'Adam', surname: 'Smith'}
getURLParameters('google.com') // {}
