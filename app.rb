require 'sinatra/base'
require 'sinatra/json'
require 'dotenv'

Dotenv.load

class BindingVasExperiments < Sinatra::Base
  helpers Sinatra::JSON

  configure do
    set :dropbox_key, ENV['DROPBOX_KEY']
  end

  # Development home
  # This is the SPA root
  get '/' do
    File.read(File.join('public', 'index.html'))
  end

  get '/drobox_oauth_receiver' do
    erb :drobox_oauth_receiver
  end

  get '/config' do
    json ({
      dropbox_key: settings.dropbox_key
    })
  end
end
