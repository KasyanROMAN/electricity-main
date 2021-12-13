export class World {
	constructor() {
	}

	createPowerPlant() {
		return new PowerPlant();
	}

	createHousehold() {
		return new Household();
	}

	connectHouseholdToPowerPlant(household, powerPlant) {
		household.connectToPowerPlant(powerPlant);
	}

	connectHouseholdToHousehold(household1, household2) {
		household1.connectToHouseHold(household2);
		household2.connectToHouseHold(household1);
	}

	disconnectHouseholdFromPowerPlant(household, powerPlant) {
		household.disconnectFromPowerPlant(powerPlant);
	}

	killPowerPlant(powerPlant) {
		powerPlant.kill();
	}

	repairPowerPlant(powerPlant) {
		powerPlant.repair();
	}

	householdHasEletricity(household) {
		return household.hasElectricity();
	}
}

class Household {
	constructor() {
		this.powerplants = new Set();
		this.households = new Set();
	}

	connectToPowerPlant(powerPlant) {
		this.powerplants.add(powerPlant);
	}

	disconnectFromPowerPlant(powerPlant) {
		this.powerplants.delete(powerPlant);
	}

	connectToHouseHold(household) {
		this.households.add(household);
	}

	disconnectFromHouseHold(household) {
		this.households.delete(household);
	}

	hasAlivePowerplant() {
  	return [...this.powerplants].some(e => e.alive)
  }

	hasElectricity(visitedHouseholds = new Set()) {
		if (visitedHouseholds.has(this)) {
			return false;
		}
		visitedHouseholds.add(this);
		if (this.hasAlivePowerplant()) {
			return true;
		} else {
			const paths = [];
			this.households.forEach(h => {
				if (h.households.size === 0) {
					paths.push(false);
				} else {
					paths.push(h.hasElectricity(visitedHouseholds));
				}
			});
			return paths.some(p => p); 
		}
	}
}

class PowerPlant {
	constructor() {
		this.alive = true;
	}

	kill() {
		this.alive = false;
	}
	repair() {
		this.alive = true;
	}
}

