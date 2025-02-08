from flask import Flask
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackContext, CallbackQueryHandler
import threading

TOKEN = "8164935831:AAFRLKMSIQlsoQUpuXN-3iqC2thQOQCOwr4"  # Tokeningizni qo‘ying

app = Flask(__name__)

@app.route('/')
def home():
    return "Bot ishlayapti!"

async def start(update: Update, context: CallbackContext):
    keyboard = [
        [InlineKeyboardButton("👋 Play Game", web_app={"url": "https://qodextoken.onrender.com"})],
        [InlineKeyboardButton("💪💋 Join Community", url="https://t.me/QODEX_COIN")],
        [InlineKeyboardButton("🧾 Help", callback_data="help")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Welcome! Press the button below to open the Web App.", reply_markup=reply_markup)

async def help(update: Update, context: CallbackContext):
    help_text = """
    Explore the complete guide

    Tap to Earn:
    TapSwap is an addictive clicker game where you accumulate Shares by tapping the screen.

    Leagues:
    Climb the ranks by earning more Shares and outperforming others in the leagues.

    Boosts:
    Unlock boosts and complete tasks to maximize your Shares earnings.

    Friends:
    Invite others and both of you will receive bonuses. Assist your friends in advancing to higher leagues for bigger Shares rewards.

    The Purpose:
    Collect as many Shares as possible and exchange them for QODEX.
    """
    await update.message.reply_text(help_text)

def run_bot():
    application = Application.builder().token(TOKEN).build()
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CallbackQueryHandler(help, pattern="help"))
    application.run_polling()

# Botni alohida oqimda ishga tushiramiz
threading.Thread(target=run_bot).start()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)