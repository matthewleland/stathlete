from nba_api.stats.endpoints import playercareerstats
career = playercareerstats.PlayerCareerStats(player_id='203999') 

data = career.get_json()

print(data)
