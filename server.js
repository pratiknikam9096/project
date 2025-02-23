import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import twilio from 'twilio'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = twilio(accountSid, authToken)

app.post('/api/send-sms', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body

    // Validate input
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    // Format message
    const smsMessage = `New Contact Form Submission:
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}`

    // Send SMS using Twilio
    const twilioMessage = await client.messages.create({
      body: smsMessage,
      to: '+919096457620', // Your admin number
      from: process.env.TWILIO_PHONE_NUMBER
    })

    console.log('Message sent successfully:', twilioMessage.sid)

    res.json({
      success: true,
      message: 'Message sent successfully! We will contact you soon.'
    })
  } catch (error) {
    console.error('Error sending message:', error)
    
    // Send appropriate error message
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: error.message
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})