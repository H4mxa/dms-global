export const customLinkify = require('linkify-it')()
  .add('@', {
    validate: function (text: any, pos: any, self: any) {
      var tail = text.slice(pos);

      if (!self.re.twitter) {
        self.re.twitter = new RegExp(
          '^([a-zA-Z0-9_]){1,15}(?!_)(?=$|' + self.re.src_ZPCc + ')',
        );
      }
      if (self.re.twitter.test(tail)) {
        // Linkifier allows punctuation chars before prefix,
        // but we additionally disable `@` ("@@mention" is invalid)
        if (pos >= 2 && tail[pos - 2] === '@') {
          return false;
        }
        return tail.match(self.re.twitter)[0].length;
      }
      return 0;
    },
    normalize: function (match: any) {
      match.url = 'https://twitter.com/' + match.url.replace(/^@/, '');
    },
  })
  .add('#', {
    validate: function (text: any, pos: any, self: any) {
      var tail = text.slice(pos);

      if (!self.re.twitter) {
        self.re.twitter = new RegExp(
          '^([a-zA-Z0-9_]){1,30}(?!_)(?=$|' + self.re.src_ZPCc + ')',
        );
      }
      if (self.re.twitter.test(tail)) {
        // Linkifier allows punctuation chars before prefix,
        // but we additionally disable `@` ("@@mention" is invalid)
        if (pos >= 2 && tail[pos - 2] === '#') {
          return false;
        }
        return tail.match(self.re.twitter)[0].length;
      }
      return 0;
    },
    normalize: () => {},
  });
