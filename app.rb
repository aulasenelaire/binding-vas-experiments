require 'sinatra'

class BindingVasExperiments < Sinatra::Base
  get '/hello' do
    "Hello, world!"
  end
end
