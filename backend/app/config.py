from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "WP Service API"
    database_url: str = "postgresql+psycopg://wpservice:wpservice@postgres:5432/wpservice"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
