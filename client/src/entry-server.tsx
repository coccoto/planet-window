// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server"

export default createHandler(() => (
    <StartServer
        document={({ assets, children, scripts }) => (
            <html>
                <head>
                    {assets}
                    <meta charset='utf-8'></meta>
                    <meta name='viewport' content='width=device-width, initial-scale=1'></meta>
                    <meta name="description" content='Look out the window into space and explore the solar system in 3D. Rotate planets and discover the wonders of the cosmos.'></meta>
                    <meta name='author' content='coccoto'></meta>
                    {/* OGP */}
                    <meta property='og:url' content='https://planet-window.com/'></meta>
                    <meta property='og:type' content='website'></meta>
                    <meta property='og:title' content='Planet Window<'></meta>
                    <meta property='og:description' content='Look out the window into space and explore the solar system in 3D. Rotate planets and discover the wonders of the cosmos.'></meta>
                    <meta property='og:image' content='favicons/icon-512x512.png'></meta>
                    {/* Twitter */}
                    <meta name='twitter:card' content='summary'></meta>
                    <meta name='twitter:creator' content='@coccoto'></meta>
                    {/* Favicon */}
                    <link rel='icon' type='image/png' href='favicons/icon-32x32.png'></link>
                    <link rel='apple-touch-icon' href='favicons/icon-256x256.png'></link>

                    {/* Google Fonts */}
                    <link rel='preconnect' href='https://fonts.googleapis.com'></link>
                    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous'></link>
                    <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;400;500&display=swap'></link>
                </head>
                <body>
                    <div id="app">{children}</div>
                    {scripts}
                </body>
            </html>
        )}
    />
));
