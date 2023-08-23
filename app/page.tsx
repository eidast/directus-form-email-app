import Image from 'next/image'
import { createDirectus, rest, createItem } from "@directus/sdk"
const client = createDirectus('https://gcs-directus-demo-5awywjxlxq-uc.a.run.app/').with(rest());

export default function Home() {

  const handleSubmit = async (formData) => {
    'use server';
  
    const full_name = formData.get('full_name');
    const email_address = formData.get('email_address');
    const phone_number = formData.get('phone_number');
    const country = formData.get('country');
    const about_you = formData.get('about_you');
  
    try {
      await client.request(
        createItem('user_data', {
          full_name,
          email_address,
          phone_number,
          country,
          about_you,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-xs center">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">User Data Form</h1>
      <p>Please fill in your details below</p>
      <form action={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label htmlFor='name' className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
          <input id='name' name='full_name' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          <label htmlFor='email' className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
          <input type='email' name='email_address' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id='email' required />
          <label htmlFor='phone' className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
          <input type='tel' name='phone_number' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id='phone' required />
          <label htmlFor='country' className="block text-gray-700 text-sm font-bold mb-2">Choose your Country</label>
          <select name='country' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id='country' required>
            <option value='kenya'>Kenya</option>
            <option value='usa'>United States</option>
            <option value='germany'>Germany</option>
            <option value='uae'>United Arab Emirates</option>
          </select>
          <label htmlFor='aboutyou' className="block text-gray-700 text-sm font-bold mb-2">About You</label>
          <textarea
            id='aboutyou'
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name='about_you'
            rows='4'
            cols='50'
            required
            placeholder='Enter information about yourself...'
          />
        <button type="button" className='class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>Submit</button>
      </form>
      </div>
    </main>
  )
}
