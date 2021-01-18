fx_version 'bodacious'
games { 'rdr3'}
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

author 'artum'
description 'avg (Average)'
repository 'https://github.com/'
version '0.0.1'

files {
    -- DEPENDENCIES --
    'MySql.Data.dll',
    'Newtonsoft.Json.dll',
    'avgsh.net.dll',

    -- UI --
    'ui/src/fonts/*.ttf',
    'ui/src/less/*.less',
    'ui/src/css/*.css',
    'ui/src/js/*.js',
    'ui/src/img/*.png',
    'ui/src/img/*.jpg',
    'ui/src/img/icons/*.png',
    'ui/src/img/icons/*.jpg',
    'ui/src/index.html',

    -- CONFIG --
    '*.json',
    'config/*.json',
    'utils/*.json',
    'languages/*.json',
    'scenes/*.json'
}

ui_page 'ui/src/index.html'
client_script 'avgc.net.dll'
server_script 'avgs.net.dll'