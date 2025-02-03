from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from config import Config  # Config sozlamalarini yuklash

app = Flask(__name__)
app.config.from_object(Config)  # Config.py dagi sozlamalarni yuklash
db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "home"

# Foydalanuvchi modeli
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    telegram_id = db.Column(db.String(50), unique=True, nullable=False)
    username = db.Column(db.String(50))
    balance = db.Column(db.Integer, default=0)
    energy = db.Column(db.Integer, default=1000)
    click_power = db.Column(db.Integer, default=1)
    energy_max = db.Column(db.Integer, default=1000)
    wallet = db.Column(db.String(100), default="")

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Asosiy sahifa
@app.route('/')
def home():
    return render_template('home.html')

# Earn sahifasi (Referal tizimi)
@app.route('/earn')
@login_required
def earn():
    return render_template('earn.html')

# Upgrade sahifasi
@app.route('/upgrade')
@login_required
def upgrade():
    return render_template('upgrade.html')

# Admin paneli
@app.route('/admin')
@login_required
def admin():
    if current_user.id != 1:  # Faqat admin kirishi uchun
        return redirect(url_for('home'))
    users = User.query.all()
    return render_template('admin.html', users=users)

# Bosish kuchini oshirish
@app.route('/upgrade-click', methods=['POST'])
@login_required
def upgrade_click():
    user = User.query.get(current_user.id)
    cost = user.click_power * 100

    if user.balance >= cost:
        user.balance -= cost
        user.click_power += 1
        db.session.commit()
        return jsonify({"success": True, "message": "Bosish kuchi oshirildi!"})
    
    return jsonify({"success": False, "message": "Tangangiz yetarli emas!"})

# Maksimal energiyani oshirish
@app.route('/upgrade-energy', methods=['POST'])
@login_required
def upgrade_energy():
    user = User.query.get(current_user.id)
    cost = user.energy_max * 100

    if user.balance >= cost:
        user.balance -= cost
        user.energy_max += 500
        db.session.commit()
        return jsonify({"success": True, "message": "Maksimal energiya oshirildi!"})
    
    return jsonify({"success": False, "message": "Tangangiz yetarli emas!"})

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)