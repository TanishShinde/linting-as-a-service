require 'typhoeus'
require 'oj'

org_script = File.open('example.sh').read()
script = ''
10_000.times do
  script << "#{org_script}\n"
end ; nil

def send_request(url, script, type)
  Typhoeus.post(url,
                body: Oj.dump({
                                'script' => script,
                                'type' => type
                              }),
                headers: {
                  'Content-Type' => 'application/json'
                })
end

resp = send_request("127.0.0.1:3000/check", org_script, 'sh')
puts resp.response_body


