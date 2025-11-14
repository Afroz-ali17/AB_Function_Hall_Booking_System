# Google Sheets Integration Setup Guide

## Overview
Your AB Function Hall system now automatically syncs **ALL data** to Google Sheets in real-time! This includes:
- ✅ **User Registrations** - Every new account created
- ✅ **User Logins** - Every time someone logs in (with IP & device info)
- ✅ **Bookings** - All booking requests and status updates

## 📋 What Gets Tracked

### 1. **Registrations Sheet**
Every new user signup is automatically logged with:
- User ID, Name, Email, Registration timestamp

### 2. **Logins Sheet** 
Every login attempt is tracked with:
- User ID, Email, Login time, IP Address, User Agent (browser/device)

### 3. **Bookings Sheet**
All booking data including:
- Booking ID, Name, Email, Phone, Event details, Dates, Guest count, Status changes

---

## 🚀 Setup Instructions

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it: **"AB Function Hall - Admin Dashboard"**
4. Create **THREE** sheet tabs (rename them exactly as shown):
   - **"Registrations"**
   - **"Logins"**
   - **"Bookings"**

#### Sheet 1: "Registrations" Headers (Row 1):
```
A1: User ID
B1: Name
C1: Email
D1: Registered At
```

#### Sheet 2: "Logins" Headers (Row 1):
```
A1: User ID
B1: Email
C1: Login Time
D1: IP Address
E1: User Agent
```

#### Sheet 3: "Bookings" Headers (Row 1):
```
A1: Booking ID
B1: Name
C1: Email
D1: Phone
E1: Event Type
F1: Start Date
G1: End Date
H1: Guest Count
I1: Status
J1: Message
K1: User ID
L1: Created At
```

5. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```

---

### Step 2: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Create Project"**
3. Enter project name: **"AB Function Hall"**
4. Click **"Create"** and wait for it to be ready

---

### Step 3: Enable Google Sheets API

1. In the Cloud Console, use the search bar at top
2. Search for **"Google Sheets API"**
3. Click on the result
4. Click **"Enable"** button

---

### Step 4: Create Service Account

1. In the left sidebar, go to **APIs & Services** → **Credentials**
2. Click **"Create Credentials"** at the top
3. Select **"Service Account"**
4. Fill in the form:
   - **Service account name**: `ab-function-hall`
   - **Description** (optional): `Service account for admin data sync`
5. Click **"Create and Continue"**
6. For **"Grant this service account access to project"**:
   - Select role: **"Editor"**
   - Click **"Continue"**
7. Click **"Done"** (skip optional steps)

---

### Step 5: Generate JSON Key

1. You'll see your service account in the credentials list
2. Click on the **service account email** (looks like: `ab-function-hall@project-id.iam.gserviceaccount.com`)
3. Go to the **"Keys"** tab
4. Click **"Add Key"** → **"Create new key"**
5. Select **"JSON"** format
6. Click **"Create"**
7. A JSON file will be downloaded - **SAVE THIS SECURELY!** ⚠️

---

### Step 6: Share Google Sheet with Service Account

1. Open the JSON file you just downloaded
2. Find and copy the `client_email` value (looks like: `ab-function-hall@project-id.iam.gserviceaccount.com`)
3. Go back to your Google Sheet
4. Click **"Share"** button (top right)
5. Paste the service account email
6. Set permission to **"Editor"**
7. **Uncheck** "Notify people" (it's a service account, not a real person)
8. Click **"Share"**

---

### Step 7: Configure Environment Variables

1. Open your `.env` file in the project
2. Add these 4 variables from your downloaded JSON file:

```env
# Google Sheets Configuration
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_from_url
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL=ab-function-hall@project-id.iam.gserviceaccount.com
GOOGLE_SHEETS_PROJECT_ID=your-project-id
```

**How to get each value:**

- **SPREADSHEET_ID**: From Step 1, the ID in your Google Sheet URL
- **PRIVATE_KEY**: From JSON file, copy the entire `private_key` value (keep the quotes and \n characters)
- **CLIENT_EMAIL**: From JSON file, the `client_email` field
- **PROJECT_ID**: From JSON file, the `project_id` field

⚠️ **Important Notes:**
- Keep the private key in quotes with the escaped newlines (`\n`)
- Never commit the `.env` file to git
- Never share the JSON key file publicly

---

### Step 8: Test the Integration

1. Your dev server should automatically restart after saving `.env`
2. **Test Registration**: Go to `/register` and create a test account
   - Check "Registrations" sheet - you should see the new user! 🎉
3. **Test Login**: Go to `/login` and log in
   - Check "Logins" sheet - you should see the login entry with IP and device! 🎉
4. **Test Booking**: Go to `/booking` and create a test booking
   - Check "Bookings" sheet - you should see the booking! 🎉

---

## 📊 What Gets Synced

### User Registration (Registrations Sheet):
- Captured immediately when user creates account
- Includes: User ID, Full name, Email, Registration timestamp

### User Login (Logins Sheet):
- Captured every time user logs in successfully
- Includes: User ID, Email, Login timestamp, IP address, Browser/Device info
- Perfect for security monitoring and analytics

### Bookings (Bookings Sheet):
- **New booking**: All details added as new row with "pending" status
- **Status update**: When admin approves/rejects, status column updates automatically
- Includes: All booking details, contact info, event dates, guest count

---

## 🔍 Monitoring

Check your server logs to see sync status:
- ✅ `"Registration logged to Google Sheets"` = User signup tracked
- ✅ `"Login logged to Google Sheets"` = Login tracked
- ✅ `"Booking logged to Google Sheets"` = Booking tracked
- ✅ `"Booking status updated in Google Sheets"` = Status change synced
- ❌ `"Failed to log/sync to Google Sheets"` = Error (data still saved to database)

The integration is **optional** - if Google Sheets is not configured, everything still works normally with your database.

---

## 🛡️ Security Best Practices

✅ **DO:**
- Keep the JSON key file secure
- Store credentials in `.env` file only
- Add `.env` to `.gitignore`
- Rotate service account keys quarterly
- Give service account "Editor" access (not "Owner")
- Monitor the Logins sheet for suspicious activity

❌ **DON'T:**
- Commit `.env` or JSON key to git
- Share credentials publicly
- Use the same service account for multiple projects

---

## 🎯 Benefits

✅ **Real-time Admin Dashboard**: View all activity in one spreadsheet
✅ **Security Monitoring**: Track login attempts, IP addresses, devices
✅ **User Analytics**: See registration trends, login frequency
✅ **Booking Management**: Manage all bookings in familiar spreadsheet interface
✅ **Data Export**: Easily export to CSV/Excel for reports
✅ **Team Collaboration**: Share sheet with team members (read-only access)
✅ **Charts & Reports**: Use Google Sheets formulas and charts for insights
✅ **No Manual Entry**: Everything syncs automatically in real-time

---

## 📈 Example Use Cases

1. **Security Audit**: Check Logins sheet for unusual IP addresses or login times
2. **Marketing Analysis**: See registration trends by date in Registrations sheet
3. **Booking Reports**: Create pivot tables from Bookings sheet data
4. **Customer Support**: Quickly search for customer by email across all sheets
5. **Business Intelligence**: Build dashboards with Google Data Studio connected to your sheet

---

## 🆘 Troubleshooting

### "401 Unauthorized" error
- Check that private key and email are correct in `.env`
- Verify no extra spaces or quotes

### "403 Forbidden" error
- Make sure you shared the sheet with the service account email
- Check that the email has "Editor" access

### "404 Not Found" error
- Verify the spreadsheet ID is correct
- Make sure the sheet tabs are named exactly: "Registrations", "Logins", "Bookings"

### Data not appearing in sheets
- Check server logs for error messages
- Verify all 4 environment variables are set
- Make sure all three sheets exist with correct names
- Verify header rows match exactly (step 1)

### "TypeError: Cannot read property" error
- Check that sheet tab names are spelled correctly (case-sensitive)
- Ensure header columns are in the exact order shown above

---

## 📞 Need Help?

If you encounter issues:
1. Check the server logs in your terminal
2. Verify all setup steps were completed
3. Make sure all three sheets exist with correct headers
4. Test each feature individually to isolate the issue

---

## 🎨 Google Sheets Tips

### Conditional Formatting for Booking Status:
1. Select the "Status" column in Bookings sheet
2. Format → Conditional formatting
3. Set rules:
   - "pending" = Yellow background
   - "approved" = Green background
   - "rejected" = Red background

### Create Dashboard Charts:
- **Registrations over time**: Line chart from Registrations sheet
- **Login activity**: Bar chart showing logins per day
- **Booking status breakdown**: Pie chart of pending/approved/rejected
- **Popular event types**: Bar chart from Event Type column

### Filter Views:
- Create filter views to show only approved bookings
- Filter logins by specific date range
- Search registrations by email domain

---

**Happy tracking! 🎉 You now have a complete admin dashboard in Google Sheets!**