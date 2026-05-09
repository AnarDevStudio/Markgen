module AiModels
  class Base
    attr_reader :api_key, :base_url, :model

    def initialize(api_key:)
      @api_key = api_key
    end
  end

  class OpenAI < Base
    def initialize(api_key:)
      super

      @base_url = "https://api.openai.com/v1"
      @model = "gpt-4.1-mini"
    end

    def chat_endpoint
      "#{base_url}/chat/completions"
    end
  end

  class Claude < Base
    def initialize(api_key:)
      super

      @base_url = "https://api.anthropic.com/v1"
      @model = "claude-sonnet-4-20250514"
    end

    def messages_endpoint
      "#{base_url}/messages"
    end
  end

  class Gemini < Base
    def initialize(api_key:)
      super

      @base_url = "https://generativelanguage.googleapis.com/v1beta"
      @model = "gemini-2.5-pro"
    end

    def generate_content_endpoint
      "#{base_url}/models/#{model}:generateContent?key=#{api_key}"
    end
  end

  class Grok < Base
    def initialize(api_key:)
      super

      @base_url = "https://api.x.ai/v1"
      @model = "grok-3"
    end

    def chat_endpoint
      "#{base_url}/chat/completions"
    end
  end


  class DeepSeek < Base
    def initialize(api_key:)
      super

      @base_url = "https://api.deepseek.com/v1"
      @model = "deepseek-chat"
    end

    def chat_endpoint
      "#{base_url}/chat/completions"
    end
  end

  class Mistral < Base
    def initialize(api_key:)
      super

      @base_url = "https://api.mistral.ai/v1"
      @model = "mistral-large-latest"
    end

    def chat_endpoint
      "#{base_url}/chat/completions"
    end
  end

  class Cohere < Base
    def initialize(api_key:)
      super

      @base_url = "https://api.cohere.ai/v1"
      @model = "command-r-plus"
    end

    def chat_endpoint
      "#{base_url}/chat"
    end
  end
end