const whitelists = [
  "http://localhost:5174",
  "http://192.168.42.215:5173",
  "http://localhost:5173",
  "http://localhost:5175",
];

const corsOptions = {
  origin: function (origin, callback) {
    const isOriginInWhitelist = origin && whitelists.includes(origin);
    callback(null, isOriginInWhitelist);
  },
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

module.exports = corsOptions;