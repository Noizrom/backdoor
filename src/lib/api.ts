import { errors, ErrorType } from './store';

const URL_ORIGIN = `http://${location.hostname}:4010/api/send_command`

export async function send_command(command: string) {
  try {
    const url = new URL(URL_ORIGIN)
    url.searchParams.append('command', command)

    const results = await fetch(url, {
      headers: {
        accept: 'application/json',
        'accept-language': 'en-US,en;q=0.9,fil;q=0.8',
        'sec-ch-ua':
          '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        Referer: 'http://localhost:4010/api/docs',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      method: 'GET',
    })
    return results.json()
  } catch (error) {
    errors.add({
      message: error,
      type: ErrorType.transport_error,
      id: Date(),
      time: new Date().getTime(),
    })
  }
}
